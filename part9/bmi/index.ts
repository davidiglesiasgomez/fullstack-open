import express, { Request, Response } from 'express';
const app = express();
app.use(express.json());
import { calculateBmi } from './bmi';
import { calculateExercises } from './exercise';

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const { height, weight } = req.query;

  if ( !height || isNaN(Number(height)) || !weight || isNaN(Number(weight)) ) {
    return res.send({ error: 'malformatted parameters'}).status(400);
  }

  return res.send({
    weight,
    height,
    bmi: calculateBmi(Number(height), Number(weight))
  });

});

interface Body {
  daily_exercises: number[]
  target: number
}

app.post('/exercises', (req: Request, res: Response) => {
  const body = req.body as Body;

  if ( !body || !body.daily_exercises || !body.target ) {
    return res.send({ error: 'parameters missing'}).status(400);
  }

  if (isNaN(Number(body.target)) || body.daily_exercises.find(item => ( isNaN(Number(item)) ? true : false ))) {
    return res.send({ error: 'malformatted parameters'}).status(400);
  }

  return res.send(calculateExercises(body.daily_exercises, body.target));

});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});