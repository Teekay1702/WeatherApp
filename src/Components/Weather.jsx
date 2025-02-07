import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=97572b6d2096110a47cda11e64fe3d87`);
            setWeatherData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
        setCity('');
    };


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input type="text"
                    placeholder='Enter city name'
                    value={city}
                    onChange={handleInputChange}
                />
                <button type='submit'>Get Weather</button>
            </form>
            {weatherData ? (
                <>
                    <div className="weather-info">
                        <h2>{weatherData.name}</h2>
                        <div className="weather-icon">🌦️</div>
                        <p className="temp">{Math.round(weatherData.main.temp - 273.15)}°C</p>
                        <p className="description">{weatherData.weather[0].description}</p>

                        <div className="details">
                            <div className="detail-box">
                                <p className="title">Feels Like</p>
                                <p>{Math.round(weatherData.main.feels_like - 273.15)}°C</p>
                            </div>
                            <div className="detail-box">
                                <p className="title">Wind</p>
                                <p>{weatherData.wind.speed} m/s</p>
                            </div>
                            <div className="detail-box">
                                <p className="title">Humidity</p>
                                <p>{weatherData.main.humidity}%</p>
                            </div>
                            <div className="detail-box">
                                <p className="title">Pressure</p>
                                <p>{weatherData.main.pressure} hPa</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading weather data... </p>
            )}
        </div>
    )
}

export default Weather;