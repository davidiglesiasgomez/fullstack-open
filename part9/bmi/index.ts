import express from 'express'
const app = express()
import { calculateBmi } from './bmi'

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query

  if ( !height || isNaN(Number(height)) || !weight || isNaN(Number(weight)) ) {
    return res.send({ error: 'malformatted parameters'}).status(400)
  }

  return res.send({
    weight,
    height,
    bmi: calculateBmi(Number(height), Number(weight))
  })

})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})