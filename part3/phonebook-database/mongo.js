const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

const url = process.env.REACT_APP_MONGODB_CONNECTION_STRING

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 2) {

  console.log('phonebook:')
  Person.find({}).then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
  })

} else if (process.argv.length === 4) {

  const name = process.argv[2]
  const number = process.argv[3]

  const person = new Person({
    name: name,
    number: number,
  })
  
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })

}
