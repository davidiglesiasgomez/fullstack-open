import React from 'react'

const Persons = ({ newFilter, persons, handleDelete }) => {
  const personsToShow = (
    newFilter === ''
      ? persons
      : persons.filter((person) => person.name.match(new RegExp(newFilter, 'i')))
  )

  return (
    <>
      {personsToShow.map(person =>
        <p key={person.id}>{person.name} {person.number} <button onClick={() => { if (window.confirm(`Delete ${person.name}?`)) handleDelete(person.id) }}>delete</button></p>
      )}
    </>
  )
}

export default Persons
