import OneCountry from "./OneCountry"
import Country from "./Country"

const Result = ({ countries, newFilter, handleChangeShow, show }) => {
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
      {countries.map(country => <Country key={country.cca2} country={country} handleChangeShow={handleChangeShow} show={show} />)}
      </>
    ) 
  
    return (
      <p>
      Two many matches, specify another filter
      </p>
    )
}
  
export default Result