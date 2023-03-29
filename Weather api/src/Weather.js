import React from 'react';

export default function Weather({weather}) {
    // const {weather} = props;

    return (
        weather ?

            (<div id='weather'>
                <h1 className='city'>Weather in {weather.name}:</h1>
                <img className='icon' src ={ `https://openweathermap.org/img/w/${weather.weather[0].icon}.png` }alt = "weatherPic"></img>


                <h1 className='temp'>{weather.main.temp} F</h1>
                <h2 className='description'>{weather.weather[0].description}</h2>
            </div>)
            : <h1 id='noWeather'>Type in a zip code to get started...</h1>
    )
}
