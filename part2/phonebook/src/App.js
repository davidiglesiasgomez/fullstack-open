import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {        
        setPersons(response.data)      
      })  
  }, [])

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

    const newPhoneObject = {
      name: newName,
      phone: newPhone
    }

    let person_found = persons.find((person) => person.name === newName) || null
    if (person_found !== null) {
      if ( !window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) ) {
        return
      }

      personService
        .update(newPhoneObject, person_found.id)
        .then(response => {      
          setPersons(persons.map(person => person.id !== person_found.id ? person : response.data))
          setNewName('')
          setNewPhone('')
        })
      return
    }

    personService
      .create(newPhoneObject)
      .then(response => {      
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewPhone('')
      })
  }

  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDelete = (id) => {
    console.log(id)
    personService
      .remove(id)
      .then(response => {   
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Filter</h2>
      <Filter newFilter={newFilter} handleChangeFilter={handleChangeFilter} />
      <h2>Add a new</h2>
      <PersonForm 
        newName={newName} 
        newPhone={newPhone} 
        handleSubmit={handleSubmit} 
        handleChangeName={handleChangeName} 
        handleChangePhone={handleChangePhone} 
      />
      <h2>Numbers</h2>
      <Persons 
        newFilter={newFilter} 
        persons={persons} 
        handleDelete={handleDelete} 
      />
    </div>
  )
}

export default App