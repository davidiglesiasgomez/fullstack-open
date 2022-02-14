const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const helper = require('./test_helper')

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })

  test('correct username and password must return token and user info', async () => {

    const userLogin = {
      username: helper.initialUsers[0].username,
      password: 'sekret'
    }

    const response = await api
      .post('/api/login')
      .send(userLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeDefined()
    expect(response.body.username).toBeDefined()
    expect(response.body.name).toBeDefined()
  })

  test('correct username and password must return correct token', async () => {

    const userLogin = {
      username: helper.initialUsers[0].username,
      password: 'sekret'
    }

    const user = await User.findOne({ username: userLogin.username })

    const userForToken = {
      username: user.username,
      id: user.id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    const response = await api
      .post('/api/login')
      .send(userLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeDefined()
    expect(response.body.token).toEqual(token)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})