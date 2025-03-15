import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "b96d6cc1875b01504a544d331d60a678"; // Replace with your API key
const API_URL = "https://api.openweathermap.org/data/2.5/forecast";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setError("");
      const response = await axios.get(`${API_URL}`, {
        params: {
          q: city,
          appid: API_KEY,
          units: "metric",
          cnt: 7,
        },
      });

      const dailyForecast = response.data.list.filter((_, index) => index % 8 === 0);
      setWeatherData(dailyForecast);
    } catch (err) {
      setError("City not found. Please try again.");
      setWeatherData([]);
    }
  };

  return (
    <div className="container">
      <h2 className="title">🌤 7-Day Weather Forecast</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
        />
        <button onClick={fetchWeather} className="button">Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="weather-container">
        {weatherData.map((day, index) => (
          <div key={index} className="weather-card">
            <h3>{new Date(day.dt * 1000).toDateString()}</h3>
            <p>🌡 Temp: {day.main.temp}°C</p>
            <p>🌦 {day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
