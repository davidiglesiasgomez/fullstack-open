import { useState } from 'react'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

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
      phone: newPhone
    }

    setPersons(persons.concat(newPhoneObject))
    setNewName('')
    setNewPhone('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
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
      {persons.map((person) => <p key={person.name}>{person.name} {person.phone}</p>)}
    </div>
  )
}

export default App