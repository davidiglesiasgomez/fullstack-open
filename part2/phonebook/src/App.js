import { useState } from 'react'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
      <div>
          filter shown with <input value={newFilter} onChange={handleChangeFilter} />
        </div>
      <h2>Add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handleChangePhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      { 
        newFilter === ''
        ? persons.map((person) => <p key={person.id}>{person.name} {person.phone}</p>)
        : persons.filter((person) => person.name.match(new RegExp( newFilter, 'i' ))).map((person) => <p key={person.id}>{person.name} {person.phone}</p>)
      }
      
    </div>
  )
}

export default App