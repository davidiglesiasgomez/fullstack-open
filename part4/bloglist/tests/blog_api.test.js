const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

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

  describe('viewing a specific blog', () => {
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
    })

  })

})

afterAll(async () => {
  await mongoose.connection.close()
})