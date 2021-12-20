const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '61c08ab51c99611160a8f8ac',
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '61c08ab51c99611160a8f8ac',
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '61c08ab51c99611160a8f8ac',
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '61c08ab51c99611160a8f8ac',
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '61c08ab51c99611160a8f8ac',
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '61c08ab51c99611160a8f8ac',
    __v: 0
  }
]

const initialUsers = [
  {
    _id: '61c08ab51c99611160a8f8ac',
    username: 'root',
    name: 'Superuser',
    blogs: [],
    passwordHash: '',
    __v: 0
  },
  {
    _id: '61c093b091da692f40cee05b',
    username: 'random',
    name: 'Randomuser',
    blogs: ['5a422a851b54a676234d17f7', '5a422aa71b54a676234d17f8', '5a422b3a1b54a676234d17f9', '5a422b891b54a676234d17fa', '5a422ba71b54a676234d17fb', '5a422bc61b54a676234d17fc'],
    passwordHash: '',
    __v: 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blog = new Blog({
    'title': 'Test blog',
    'author': 'Unknown',
    'url': 'foo.bar.com'
  })
  await blog.save()
  await blog.remove()
  return blog._id.toString()
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const newValidToken = ( index ) => {
  const userForToken = {
    username: initialUsers[index].username,
    id: initialUsers[index]._id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET)
  return token
}

module.exports = {
  initialBlogs,
  initialUsers,
  blogsInDb,
  nonExistingId,
  usersInDb,
  newValidToken
}