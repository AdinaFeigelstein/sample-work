import './App.css';
import Weather from './Weather';
import ZipForm from './ZipForm';
import React, { useState, useEffect } from 'react'

export default function App () {
  const [weather, setWeather] = useState(false);
  const [zip, setZip] = useState(null);
  const [moreInfo, setMoreInfo] = useState(false)


 useEffect(()=> {
  async function getWeather(){
    if(zip){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=4d940566413cbb48ddbe156f2b502364&units=imperial&lang=en`)
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText} ${data.message}`);
    }
    setWeather(data);
  }
  };
  getWeather();
  }, [zip])



    return(
      <>
      <h1 id='header'>Welcome to Weather!</h1>
      <ZipForm setZip = {setZip} setMoreInfo = {setMoreInfo}/>
      {weather ? <Weather weather={weather} moreInfo = {moreInfo} setMoreInfo = {setMoreInfo}/> : <h1 id='noWeather'>Type in a zip code to get started...</h1>}
      </>
    )
  }

