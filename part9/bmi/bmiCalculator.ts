interface CalculateBmiValues {
  value1: number
  value2: number
}

const parseArgumentsCalculateBmi = (args: Array<string>): CalculateBmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

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
  const { value1, value2 } = parseArgumentsCalculateBmi(process.argv)
  console.log(calculateBmi(value1, value2))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
