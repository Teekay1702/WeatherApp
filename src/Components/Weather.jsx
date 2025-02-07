import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const fetchData = async () => {
        if (!city) {
            setError('');
            return;
        }

        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=97572b6d2096110a47cda11e64fe3d87`);
            setWeatherData(response.data);
            setError('');
            console.log(response.data);
        } catch (error) {
            setError('City not found');
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
        <div className="weather-container">
            <div className="weather-header">
                <h2>Kandy Weather Forecast</h2>
            </div>
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={handleInputChange}
                />
                <button type="submit">🔍</button>
            </form>
            {error && <p className="error-message">{error}</p>}

            {weatherData && (
                <div className="weather-card">
                    <h3>{weatherData.name}</h3>
                    <p className="date">{new Date().toDateString()}</p>
                    <div className="weather-icon">
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                            alt="Weather Icon"
                        />
                    </div>
                    <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>
                    <p className="description">{weatherData.weather[0].description}</p>

                    <div className="weather-details">
                        <div className="detail">
                            <p>🌡️ Feels Like</p>
                            <span>{Math.round(weatherData.main.feels_like)}°C</span>
                        </div>
                        <div className="detail">
                            <p>💨 Wind</p>
                            <span>{weatherData.wind.speed} m/s</span>
                        </div>
                        <div className="detail">
                            <p>💧 Humidity</p>
                            <span>{weatherData.main.humidity}%</span>
                        </div>
                        <div className="detail">
                            <p>🌅 Sunrise</p>
                            <span>
                                {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
                            </span>
                        </div>
                        <div className="detail">
                            <p>🌇 Sunset</p>
                            <span>
                                {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Weather;