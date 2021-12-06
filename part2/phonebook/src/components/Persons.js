const Persons = ({ newFilter, persons }) => {

  const personsToShow = ( 
    newFilter === '' 
    ? persons
    : persons.filter((person) => person.name.match(new RegExp( newFilter, 'i' )))
  )

  return (
    <>
      {personsToShow.map(person => 
        <p key={person.id}>{person.name} {person.phone}</p>
      )}
    </>
  )
}
  
export default Persons