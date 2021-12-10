import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      .catch(error => {
        handleMessage(`Server unavailable`, 'error')
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
      number: newPhone
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
          handleMessage(`Modified ${newName}`, 'success')
        })
        .catch(error => {
          if (error.response.status === 404) {
            handleMessage(`Error: ${error.response.data.error}`, 'error')
            return
          }
          setPersons(persons.filter(person => person.id !== person_found.id))
          handleMessage(`Information of ${newName} has already removed from server`, 'error')
        })
      return
    }

    personService
      .create(newPhoneObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        console.log({persons})
        setNewName('')
        setNewPhone('')
        handleMessage(`Added ${newName}`, 'success')
      })
      .catch(error => {
        if (error.response.status === 400) {
            handleMessage(`Error: ${error.response.data.error}`, 'error')
            return
        }
        handleMessage(`Server unavailable`, 'error')
      })
  }

  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDelete = (id) => {
    personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== id))
        handleMessage(`Deleted`, 'success')
      })
      .catch(error => {
        setPersons(persons.filter(person => person.id !== id))
        handleMessage(`Information has already removed from server`, 'error')
      })
  }

  const handleMessage = (message, type) => {
    setErrorMessage({message: message, type: type})
    setTimeout(() => {
      setErrorMessage({})
    }, 5000)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
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