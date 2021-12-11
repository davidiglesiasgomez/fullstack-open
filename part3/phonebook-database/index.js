const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const Person = require('./models/person')

app.use(express.static('build'))

app.use(cors())

app.use(express.json())

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }
// app.use(requestLogger)

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  response.send(`Phonebook has info for ${persons.length} people<br /><br />${Date()}`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id) || null

  if (person === null) {
    response.status(404).end()
  } else {
    response.json(person)
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {

  if (typeof request.body.name === 'undefined' || request.body.name.trim() === '' || typeof request.body.number === 'undefined' || request.body.number.trim() === '') {
    response.status(400).json({ error: 'name or number are missing' }).end()
    return
  }

  const check = persons.find(person => person.name === request.body.name) || null
  if (check !== null) {
    response.status(400).json({ error: 'name must be unique' }).end()
    return
  }

  const person = request.body
  person.id = ( Math.max(...persons.map((person) => person.id), 0) + 1 )
  persons.push(person)

  response.json(person)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})