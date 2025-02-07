import React, { useState} from 'react'
import './App.css'
import Weather from './Components/Weather'
import './Components/Weather.css'

function App() {
  const [weatherCondition, setWeatherCondition] = useState('');

  const getBackgroundClass = (condition) => {
    if (!condition) return "default-bg";

    const lowerCondition = condition.toLowerCase();
        if (lowerCondition.includes("clear")) return "clear-sky";
        if (lowerCondition.includes("cloud")) return "cloudy";
        if (lowerCondition.includes("rain")) return "rainy";
        if (lowerCondition.includes("thunderstorm")) return "stormy";
        if (lowerCondition.includes("snow")) return "snowy";
        if (lowerCondition.includes("mist") || lowerCondition.includes("fog")) return "foggy";

        return "default-bg";
  };

  return (
    <div className={`app-container ${getBackgroundClass(weatherCondition)}`}>
            <h1>Weather Forecast App</h1>
            <Weather setWeatherCondition={setWeatherCondition} />
        </div>
  )
}

export default App;
