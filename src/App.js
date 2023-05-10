import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [weatherData, setWeatherData] = useState({})
  const [location, setLocation] = useState('')
  const [error, setError] =useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=eded62bd1625652ef1f36667ce5c4855`

  const searchLocation = (e)=>{
    if (e.key === 'Enter') {
      axios.get(url)
      .then(res => {
        setWeatherData(res.data)
        console.log(res.data)
      })
      .catch(e => setError(e))
      setLocation('')
    }
    
  }

  return (
    <div className="app">
       <div className="search">
        <input type="text" value={location} onChange={(e)=>setLocation(e.target.value)} placeholder="Enter Location" onKeyDown={searchLocation}/>
       </div>
       <div className="container">
        <div className="top">
          <div className="location">
            <p>{weatherData.name}</p>
          </div>
          <div className="temp">
            {weatherData.main &&

               <h1>{weatherData.main.temp.toFixed()}°F</h1>
            }
          </div>
          <div className="description">
            {weatherData.weather &&

                <p>{weatherData.weather[0].main}</p>
            }
          </div>
        </div>
        {weatherData.name &&
          <div className="bottom">
            <div className="feels">
              {weatherData.main &&
                <>
                  <p className="bold">{weatherData.main.feels_like.toFixed()} °F</p>
                  <p>Feels Like</p>
                </>
              }
            </div>
            <div className="humidity">
              {weatherData.main &&
                <>
                  <p className="bold">{weatherData.main.humidity} %</p>
                  <p>Humidity</p>
                </>
              }
            </div>
            <div className="wind">
              {weatherData.main && 
                <>
                  <p className="bold">{weatherData.wind.speed.toFixed()} MPH</p>
                  <p>Wind Speed</p>
                </>
              }
            </div>
          </div>  
        }
      </div>
    </div>
  );
}

export default App;
