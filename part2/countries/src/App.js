import { useState } from 'react'
import axios from 'axios'
import Result from "./components/Result"

const App = () => {
  const [show, setShow] = useState([])
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const handleChangeShow = (country, event) => {
    // console.log({country})

    const index = show.indexOf(country)
    if (index > -1) {
      const temp = [...show]
      temp.splice(index, 1)
      setShow(temp)
      return
    }

    setShow(show.concat(country))
  }

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
      <Result countries={countries} newFilter={newFilter} handleChangeShow={handleChangeShow} show={show} />
    </>
  );
}

export default App
