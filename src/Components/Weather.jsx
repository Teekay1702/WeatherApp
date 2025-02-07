import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = ({ setWeatherCondition }) => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const [forecastData, setForecastData] = useState([]);

    const fetchData = async () => {
        if (!city) {
            setError('');
            return;
        }

        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=97572b6d2096110a47cda11e64fe3d87&units=metric`
            );
            setWeatherData(response.data);
            setWeatherCondition(response.data.weather[0].description);

            const forecastResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=97572b6d2096110a47cda11e64fe3d87&units=metric`
            );

            const dailyForecast = forecastResponse.data.list.filter((reading) => reading.dt_txt.includes("12:00:00"));
            setForecastData(dailyForecast);
            setError('');
            console.log(response.data);
        } catch (error) {
            setError('City not found');
            console.error(error);
        }
    }

    const fetchWeatherByLocation = () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=97572b6d2096110a47cda11e64fe3d87&units=metric`
                    );
                    setWeatherData(response.data);
                    setWeatherCondition(response.data.weather[0].description);
                    const forecastResponse = await axios.get(
                        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=97572b6d2096110a47cda11e64fe3d87&units=metric`
                    );
                    const dailyForecast = forecastResponse.data.list.filter((reading) =>
                        reading.dt_txt.includes("12:00:00"));
                    setForecastData(dailyForecast);
                    setError('');
                } catch (error) {
                    setError('Unable to fetch location weather.');
                }
            },
            () => setError('Location permission denied.')
        );
    };

    useEffect(() => {
        fetchWeatherByLocation();
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
                <h2>Weather Forecast</h2>
            </div>
            <form onSubmit={handleSubmit} className="search-form">
                <input type="text" placeholder="Enter city name" value={city} onChange={handleInputChange} />
                <button type="submit">🔍</button>
                <button onClick={fetchWeatherByLocation}>📍</button>

            </form>
            {error && <p className="error-message">{error}</p>}

            {weatherData && (
                <div className="weather-card">
                    <h3>{weatherData.name}</h3>
                    <p className="date">{new Date().toDateString()}</p>
                    <div className="weather-icon">
                        <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Icon" />
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
                            <span>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</span>
                        </div>
                        <div className="detail">
                            <p>🌇 Sunset</p>
                            <span>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</span>
                        </div>
                    </div>
                </div>
            )}
            {forecastData.length > 0 && (
                <div className="forecast-container">
                    <h3>5-Day Forecast</h3>
                    <div className="forecast-cards">
                        {forecastData.map((reading, index) => (
                            <div key={index} className="forecast-card">
                                <p className="date">{new Date(reading.dt * 1000).toLocaleDateString()}</p>
                                <p className="temperature">{Math.round(reading.main.temp)}°C</p>
                                <p className="description">{reading.weather[0].description}</p>
                                <div className="weather-icon">
                                    <img src={`https://openweathermap.org/img/wn/${reading.weather[0].icon}@2x.png`} alt="Weather Icon" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Weather;