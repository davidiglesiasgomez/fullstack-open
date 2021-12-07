import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ city }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {    
        axios      
            .get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + process.env.REACT_APP_OPENWEATHERMAP_APPID + '&units=metric')      
            .then(response => {        
                setWeather(response.data)  
            })  
    }, [city])

    if (weather === null) {
        return <></>
    }

    return (
        <>
            <h2>Weather in {city}</h2>
            <p>temperature {weather.main.temp} ºC</p>
            <img src={'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png'} alt="{weather.weather[0].icon}" />
            <p>wind {weather.wind.speed}m/s direction {weather.wind.deg}º</p>
        </>
    )
}

export default Weather