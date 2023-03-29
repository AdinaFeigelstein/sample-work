import React from 'react';

export default function Weather({ weather, moreInfo, setMoreInfo }) {


    return (
        <div id='weather'>

            {!moreInfo ?
                <div id='weatherInfo'>
                    <h1 className='city'>Weather in {weather.name}:</h1>
                    <img className='icon' src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weatherPic"></img>
                    <h1 className='temp'>{weather.main.temp} F</h1>
                    <h2 className='description'>{weather.weather[0].description}</h2>
                    <p>Swipe for more info</p>
                    <button className='arrowButton' id='nextButton' onClick={() => setMoreInfo(true)}>{">"}</button>
                </div>
                : <div id='moreInfo'>
                    <div className='infoDiv'>Temperature: {weather.main.temp} F</div>
                    <div className='infoDiv'>High: {weather.main.temp_max} F</div>
                    <div className='infoDiv'>Low: {weather.main.temp_min} F</div>
                    <div className='infoDiv'>Feels like: {weather.main.feels_like} F</div>
                    <div className='infoDiv'>Humidity: {weather.main.humidity}</div>
                    <div className='infoDiv'>Pressure: {weather.main.pressure} mb</div>
                    <div className='infoDiv'>Visibility: {weather.visibility}</div>
                    <button className='arrowButton' id='backButton' onClick={() => setMoreInfo(false)}>{"<"}</button>
                    </div>
            }

        </div>

    )
}
