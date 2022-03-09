const calculateBmi = (height: number, weigth: number): string => {
  const bmi = weigth / height / height * 100 * 100
  switch(true) {
    case bmi < 16:
      return 'Underweight (Severe thinness)'
    case bmi < 16.9:
      return 'Underweight (Moderate thinness)'
    case bmi < 18.4:
      return 'Underweight (Mild thinness)'
    case bmi < 24.9:
      return 'Normal range'
    case bmi < 29.9:
      return 'Overweight (Pre-obese)'
    case bmi < 34.9:
      return 'Obese (Class I)'
    case bmi < 39.9:
      return 'Obese (Class II)'
    default:
      return 'Obese (Class III)	'
    }
}

try {
  console.log(calculateBmi(180, 74))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
