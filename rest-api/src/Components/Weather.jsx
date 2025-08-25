import React, { useEffect, useState, useRef } from "react";
import search_bar from "./sear.png";
import sunny from "./sun.png";
import cloud from "./clo.png";
import drizzel from "./drizz.png";
import rain from "./wea.png";
import snow from "./snow.png";
import wind from "./win.png";
import humidity from "./humid.png";
import "./Weather.css";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const allIcons = {
    "01d": sunny, "01n": sunny,
    "02d": cloud, "02n": cloud,
    "03d": cloud, "03n": cloud,
    "04d": drizzel, "04n": drizzel,
    "09d": rain, "09n": rain,
    "10d": rain, "10n": rain,
    "11d": rain, "11n": rain,
    "13d": snow, "13n": snow,
    "50d": cloud, "50n": cloud,
  };

  const search = async (city) => {
    if (!city) return;
    setLoading(true);
    setError(null);

    // Debug log
    console.log("API Key:", process.env.REACT_APP_WEATHER_APP_ID);

    if (!process.env.REACT_APP_WEATHER_APP_ID) {
      setError("API key is missing! Check your .env file.");
      setLoading(false);
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "City not found");
        setWeatherData(null);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || sunny;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6),
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (err) {
      setError("Could not fetch weather data. Check your city or API key.");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  const handleSearchClick = () => {
    search(inputRef.current.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearchClick();
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search City"
          onKeyDown={handleKeyDown}
        />
        <img src={search_bar} alt="Search" onClick={handleSearchClick} />
      </div>

      {loading && <div className="spinner"></div>}
      {error && <p className="error">{error}</p>}

      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
          <p className="tem">{weatherData.temperature}°c</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img style={{ width: "20px" }} src={humidity} alt="Humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img style={{ width: "20px" }} src={wind} alt="Wind Speed" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        !loading && !error && <p>Enter a city to see the weather.</p>
      )}
    </div>
  );
}


