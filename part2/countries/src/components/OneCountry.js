import Weather from './Weather'

const OneCountry = ({ country }) => {

    const languages = Object.keys(country.languages).map(function(key) {return country.languages[key]})
  
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
            {languages.map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.name.common} />
        <Weather city={country.capital[0]} />
      </>
    )
}

export default OneCountry