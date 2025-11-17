import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "9db921a1198d34a703a4726ba5fb0e7a";

  const getWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`

      );


      if (!res.ok) {
        setWeather(null);
        setError("City not found ");
        return;
      }

      const data = await res.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="container">
      <h1>Weather Dashboard 🌤️</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>{weather.name}</h2>
          <p className="temp">{weather.main.temp}°C</p>
          <p>{weather.weather[0].main}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
