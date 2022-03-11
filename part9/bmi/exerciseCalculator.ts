interface CalculateExercisesValues {
  value1: number[]
  value2: number
}

const parseArgumentsCalculateExercises = (args: Array<string>): CalculateExercisesValues => {
  if (args.length < 4) throw new Error('Not enough arguments')

  if (args.find((item, index) => ( index<2 || !isNaN(Number(item)) ? false : true ))) {
    throw new Error('Provided values were not numbers!')
  }

  return {
    value1: args.slice(2, -1).map(item => Number(item)),
    value2: Number(args[args.length - 1])
  }
}

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (horasDiariasEjercicio: number[], cantidadObjetivo: number): Result => {
  const trainingDays = horasDiariasEjercicio.filter(item => item>0)
  const average = horasDiariasEjercicio.reduce((partial, item) => partial + item, 0) / horasDiariasEjercicio.length
  let rating = null
  let ratingDescription = null
  switch (true) {
    case average / cantidadObjetivo < 0.75:
      rating = 1
      ratingDescription = 'pretty bad'
      break
    case average / cantidadObjetivo > 1.25:
      rating = 1
      ratingDescription = 'fairly good'
      break
    default:
      rating = 2
      ratingDescription = 'not too bad but could be better'
      break
  }
  return {
    periodLength: horasDiariasEjercicio.length,
    trainingDays: trainingDays.length,
    success: average > cantidadObjetivo,
    rating: rating,
    ratingDescription: ratingDescription,
    target: cantidadObjetivo,
    average: average
  }
}

try {
  const { value1, value2 } = parseArgumentsCalculateExercises(process.argv)
  console.log(calculateExercises(value1, value2))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
