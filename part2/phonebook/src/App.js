import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')    
    axios      
    .get('http://localhost:3001/persons')      
    .then(response => {        
      console.log('promise fulfilled')        
      setPersons(response.data)      
    })  
  }, [])
  console.log('render', persons.length, 'persons')

  const handleChangeName = (event) => {
    setNewName(event.target.value)
  }

  const handleChangePhone = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (newName === '') {
      alert(`It's necessary indicate a name`)
      return
    }

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPhoneObject = {
      name: newName,
      phone: newPhone,
      id: ( Math.max(...persons.map((person) => person.id), 0) + 1 )
    }

    setPersons(persons.concat(newPhoneObject))
    setNewName('')
    setNewPhone('')
  }

  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Filter</h2>
      <Filter newFilter={newFilter} handleChangeFilter={handleChangeFilter} />
      <h2>Add a new</h2>
      <PersonForm 
        newFilter={newFilter} 
        newPhone={newPhone} 
        handleSubmit={handleSubmit} 
        handleChangeName={handleChangeName} 
        handleChangePhone={handleChangePhone} 
      />
      <h2>Numbers</h2>
      <Persons 
        newFilter={newFilter} 
        persons={persons} 
      />
    </div>
  )
}

export default App