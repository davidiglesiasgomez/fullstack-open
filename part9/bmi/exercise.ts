interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export const calculateExercises = (horasDiariasEjercicio: number[], cantidadObjetivo: number): Result => {
  const trainingDays = horasDiariasEjercicio.filter(item => item>0);
  const average = horasDiariasEjercicio.reduce((partial, item) => partial + item, 0) / horasDiariasEjercicio.length;
  let rating = null;
  let ratingDescription = null;
  switch (true) {
    case average / cantidadObjetivo < 0.75:
      rating = 1;
      ratingDescription = 'pretty bad';
      break;
    case average / cantidadObjetivo > 1.25:
      rating = 1;
      ratingDescription = 'fairly good';
      break;
    default:
      rating = 2;
      ratingDescription = 'not too bad but could be better';
      break;
  }
  return {
    periodLength: horasDiariasEjercicio.length,
    trainingDays: trainingDays.length,
    success: average > cantidadObjetivo,
    rating: rating,
    ratingDescription: ratingDescription,
    target: cantidadObjetivo,
    average: average
  };
};