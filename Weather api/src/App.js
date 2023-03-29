import './App.css';
import Weather from './Weather';
import ZipForm from './ZipForm';
import React, { useState, useEffect } from 'react'

export default function App () {
  // state = {
  //   weather: false,
  //   zip: null
  // }
  const [weather, setWeather] = useState(false);
  const [zip, setZip] = useState(null);


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


  // render() {
    // if (this.state.weather) {
    //   return (
    //     <div>
    //       <h1>Weather in {this.state.weather.name}:</h1>
    //       {/* <img src = "https://openweathermap.org/img/w/{this.state.weather.weather[0].icon}.png" alt = "weatherPic"></img> */}
    //       <h1>{this.state.weather.main.temp}</h1>
    //       <h2>{this.state.weather.weather[0].description}</h2>
    //     </div>
    //   )
    // }
    // else {
    //   return (
    //     <h1>No weather</h1>
    //   )
    // }
    return(
      <>
      <h1 id='header'>Welcome to Weather!</h1>
      <ZipForm setZip = {setZip}/>
      <Weather weather={weather}/>
      </>
    )
  }

// export default App;
