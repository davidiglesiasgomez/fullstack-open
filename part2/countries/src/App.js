import { useState } from 'react'
import axios from 'axios'

const OneCountry = ({ country }) => {

  const languages = Object.keys(country.languages).map(function(key) {return country.languages[key]})

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      {languages.map(language => <p>{language}</p>)}
      <img src={country.flags.png} alt={country.name.common} />
    </>
  )
}

const Country = ({ country }) => {
  return <p>{country.name.common}</p>
}

const Result = ({ countries, newFilter }) => {
  if (newFilter === '') return <></>

  if (countries.length === 0) return (
    <p>
      Nothing found
    </p>
  )

  if (countries.length === 1) return (
    <>
    {countries.map(country => <OneCountry key={country.cca2} country={country} />)}
    </>
  ) 

  if (countries.length < 10) return (
    <>
    {countries.map(country => <Country key={country.cca2} country={country} />)}
    </>
  ) 

  return (
    <p>
    Two many matches, specify another filter
    </p>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value)

    if (event.target.value === '') return

    axios      
    .get('https://restcountries.com/v3.1/all')      
    .then(response => {      
      setCountries(response.data.filter(country => country.name.common.match(new RegExp(event.target.value, 'i'))))      
    })  
  }

  return (
    <>
      find countries <input value={newFilter} onChange={handleChangeFilter} />
      <Result countries={countries} newFilter={newFilter} />
    </>
  );
}

export default App
