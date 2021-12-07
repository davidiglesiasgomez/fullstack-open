import OneCountry from "./OneCountry"

const Country = ({ country, handleChangeShow, show }) => {
    const showed = ( show.indexOf(country.name.common) > -1 ? true : false )
  
    if ( showed ) return (
      <>
        <p>
          {country.name.common} <button onClick={(event) => handleChangeShow(country.name.common, event)}>hide</button>
        </p>
        <OneCountry country={country} />
      </>
    )
  
    return (
      <>  
        <p>
          {country.name.common} <button onClick={(event) => handleChangeShow(country.name.common, event)}>show</button>
        </p>
      </>
    )
}

export default Country