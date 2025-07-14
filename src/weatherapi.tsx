// src/WeatherAPI.tsx
import React, { useState } from 'react';
import './weatherapi.css';

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
  };
}

const Weather: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=8d314be8635740ac81281938251307&q=${city}&aqi=yes`
      );

      if (!res.ok) {
        throw new Error('City not found');
      }

      const data = await res.json();
      setWeatherData(data);
      setError('');
    } catch (err) {
      setError('City not found. Please try again.');
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-container">
      <h1>🌦️ Weather App</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="result">
          <h2>
            {weatherData.location.name}, {weatherData.location.country}
          </h2>
          <p><strong>Temperature:</strong> {weatherData.current.temp_c}°C</p>
          <p><strong>Condition:</strong> {weatherData.current.condition.text}</p>
          <img src={weatherData.current.condition.icon} alt="weather icon" />
          <p><strong>Humidity:</strong> {weatherData.current.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weatherData.current.wind_kph} km/h</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
