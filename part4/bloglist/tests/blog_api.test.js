const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')

describe('when there is initially some blogs saved', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(titles).toContain('TDD harms architecture')
  })

  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })

  test('the returned blogs has to had the user creator information', async () => {
    const response = await api.get('/api/blogs')

    response.body.map(blog => {
      expect(Object.keys(blog.user)).toEqual(['username', 'name', 'id'])
    })
  })

  describe('viewing a specific blog', () => {

    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

      expect(resultBlog.body).toEqual(processedBlogToView)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonExistingId = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${validNonExistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = 'invalidid'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })

  })

  describe('addition of a new blog', () => {

    test('new blog can be added', async () => {
      const newBlog = {
        'title': 'Test blog',
        'author': 'Unknown',
        'url': 'foo.bar.com',
        'likes': 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const titles = response.body.map(r => r.title)

      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
      expect(titles).toContain(
        'Test blog'
      )
    })

    test('new blog without likes at the request defaults to zero', async () => {
      const newBlog = {
        'title': 'Test blog',
        'author': 'Unknown',
        'url': 'foo.bar.com'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const blog = response.body.find(r => r.title === newBlog.title)

      expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
      expect(blog.likes).toBeDefined()
      expect(blog.likes).toBe(0)
    })

    test('new blog without title and url at the request returns status code 400 Bad Request', async () => {
      const newBlog = {
        'author': 'Unknown',
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('new blog must have information of creator user', async () => {
      const newBlog = {
        'title': 'Test blog',
        'author': 'Unknown',
        'url': 'foo.bar.com'
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      expect(response.body.user).toBeDefined()
    })

    test('error token missing or invalid on adding a blog without auth', async () => {
      const newBlog = {
        'title': 'Test blog',
        'author': 'Unknown',
        'url': 'foo.bar.com'
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      expect(response.body.error).toContain('token missing or invalid')
    })

    test('new blog creator user has to be the same of the auth token', async () => {
      const newBlog = {
        'title': 'Test blog',
        'author': 'Unknown',
        'url': 'foo.bar.com'
      }

      const users = await helper.usersInDb()

      const userForToken = {
        username: users[0].username,
        id: users[0].id,
      }

      const token = jwt.sign(userForToken, process.env.SECRET)

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(response.body.user).toBeDefined()
      expect(response.body.user).toEqual(users[0].id)
    })

  })

  describe('deleting a blog', () => {

    test('a blog can be delete and returns a 204 code', async () => {

      await api
        .delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
        .expect(204)

      const response = await api.get('/api/blogs')

      expect(response.body).toHaveLength(helper.initialBlogs.length - 1)
    })

    test('second call to delete the same blog must return a 404 code', async () => {

      await api
        .delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
        .expect(204)

      await api
        .delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
        .expect(404)

    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = 'invalidid'

      await api
        .delete(`/api/blogs/${invalidId}`)
        .expect(400)
    })

    test('error token missing or invalid on deleting a blog without auth', async () => {
      const blog = await Blog.findOne()

      const response = await api
        .delete(`/api/blogs/${blog.id}`)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      expect(response.body.error).toContain('token missing or invalid')
    })

    test('return 401 if a different user than the creator of a blog try to deleted', async () => {
      const users = await helper.usersInDb()

      const newUser = await helper.newUser()

      const userForToken = {
        username: newUser.username,
        id: newUser._id,
      }

      const token = jwt.sign(userForToken, process.env.SECRET)

      const blog = await Blog.findOne({user: users[0].id})

      await api
        .delete(`/api/blogs/${blog.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(401)
    })

    test('a blog must be deleted only if the creator is the same of the auth token', async () => {
      const users = await helper.usersInDb()

      const userForToken = {
        username: users[0].username,
        id: users[0].id,
      }

      const token = jwt.sign(userForToken, process.env.SECRET)

      const blog = await Blog.findOne({user: users[0].id})

      await api
        .delete(`/api/blogs/${blog.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    })

  })

  describe('updating a blog', () => {

    test('a blog can be update and returns the blog modified and a 200 code', async () => {

      const blogsAtStart = await helper.blogsInDb()

      const blogToUpdate = blogsAtStart[0]
      blogToUpdate.likes = blogToUpdate.likes + 1

      const resultBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const processedBlogToUpdate = JSON.parse(JSON.stringify(blogToUpdate))

      expect(resultBlog.body).toEqual(processedBlogToUpdate)

    })

    test('a blog that not exists must return a 404 code', async () => {

      const blogsAtStart = await helper.blogsInDb()

      const blogToUpdate = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToUpdate.id}`)

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(404)

    })

    test('fails with statuscode 400 id is invalid', async () => {

      const blogsAtStart = await helper.blogsInDb()

      const blogToUpdate = blogsAtStart[0]
      blogToUpdate.id = 'invalidid'

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(400)
    })

  })

})

afterAll(async () => {
  await mongoose.connection.close()
})