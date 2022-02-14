const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  request.token = null
  request.decodedToken = null
  request.validToken = false
  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    next()
  }
  request.token = authorization.substring(7)
  request.decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.decodedToken || !request.decodedToken.id) {
    next()
  }
  request.validToken = true
  next()
}

const userExtractor = async (request, response, next) => {
  request.user = null
  if (!request.decodedToken || !request.decodedToken.id) {
    next()
  }
  const user = await User.findById(request.decodedToken.id)
  if (!user) {
    next()
  }
  request.user = user
  next()
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}