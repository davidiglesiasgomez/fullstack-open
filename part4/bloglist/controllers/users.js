const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.username.length < 3) {
    return response.status(400).json({error: '`username` must be at least 3 characters long'})
  }

  if (body.password.length < 3) {
    return response.status(400).json({error: '`password` must be at least 3 characters long'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const newUser = await user.save()
  response.status(201).json(newUser)
})

module.exports = usersRouter