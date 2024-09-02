import React, { useEffect, useState ,useCallback} from 'react';
import './Weather.css';

export const Weather = () => {
const [weather,setWeather] = useState({});
const [cityName,setCityName] = useState("London");
const [name,setName] = useState("");
  const search = useCallback(async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=220743d213409bb277f3b9ea670ab7ae`;
      const response = await fetch(url);
      const data = await response.json(); // Await the promise returned by response.json()
      console.log(data);
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error.message); // Handle the error
    }
  });
  
  useEffect(()=>{
      search();

  },[cityName]);

  const celcius =(data)=>{
    return Math.round(data-273.15);
  }

  const weatherCheck=(e)=>{
    e.preventDefault();
    setCityName(name);
  }
  return (
    <div className='container col-sm-8 col-xs-8 col-md-6 col-lg-4 d-flex justify-content-center align-items-center'>
        <div className='row justify-content-center'>
        <h1 className='d-flex align-items-center justify-content-center'>Weather</h1>
        {weather.main?(
        <div class="card " >
        <div class="card-body">
            <form onSubmit={weatherCheck} className='inputBar d-flex'>
              <input type='text' name="text" className='input ' value={name ||""} onChange={(e) => {e.preventDefault();setName(e.target.value)}} placeholder='Search..'/>
              <button type='submit'><i class="bi bi-search"></i></button>
              </form>
          <div className='col-12 imgTag'>
            <div className='row   mt-2'>
                 <img src="weather.jpg" className="card-img-top text-center" alt="image"/>
                  <h5 class="card-title text-center ">
                  <h4>{celcius(weather.main.temp)}°C</h4>
                  <h4>{weather.name}</h4>
                 </h5>
            </div>  
            </div>
         
            <p class="card-text  col-12">
              <div className='row'>
                <div className='col-6'>
                <span className='humidityImgText'>
                <img src="weather.png" alt="weather" className='humidityImg'/>
                <span className='textHumidity'>
                <span className='humidityCount'>{weather.main.humidity}%</span> 
                <span >
                 Humidity
                </span>
                </span>
              </span>
                </div>
            
                <div className='col-6'>
                <span className='windImgText'>
                  <i class="bi bi-wind"></i>
                   <span className='windTxt'>
                    <span  className='humidityCount'>{weather.wind.speed}km/h</span>
                    <span className='Text'>Wind Speed</span>
                   </span>

                </span>
                </div>
              
                </div>
             

            
            </p>
        </div>
        </div>
        ):"data not found"}
        </div>
    </div>
  )
}
