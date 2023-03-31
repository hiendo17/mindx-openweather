import React, { useState } from "react";
import axios from "axios";
import { FaSearchLocation } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from './weather.module.css';

const iconList = [
  {
    type: "Clear",
    img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
  },
  {
    type: "Rain",
    img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
  },
  {
    type: "Snow",
    img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
  },
  {
    type: "Clouds",
    img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
  },
  {
    type: "Haze",
    img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
  },
  {
    type: "Smoke",
    img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
  },
  {
    type: "Mist",
    img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
  },
  {
    type: "Drizzle",
    img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
  },
];

function WeatherApp() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const api_key = "53d2b9e5ffc4c41135c1487777c28306"
  const search = async (e) => {
    if (e.key === "Enter") {
      try {
        console.log(query)
        const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api_key}`
        console.log(api_url)
        const result = await axios.get(
            api_url
        );
        
        setWeather(result.data);
        setQuery("");
      } catch (error) {
        toast.error("Not found!");
      }
    }
  };

  const getIconUrl = (type) => {
    const icon = iconList.find((i) => i.type === type);
    return icon ? icon.img : "";
  };

  return (
    <div className="app">
      <main>
        <div className={styles.searchBox}>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter your location"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <FaSearchLocation className="search-icon" onClick={search} />
        </div>
        {typeof weather.main != "undefined" ? (
          <div className={styles.result}>
            <div className={styles.title}>
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
            </div>
            
            <div className={styles.weatherbox}>
              <div className="weather">
                <img
                  src={getIconUrl(weather.weather[0].main)}
                  alt={weather.weather[0].main}
                  className={styles.weathericon}
                />
                </div>
                <div className="weather">{weather.weather[0].main}</div>
                <div className="temp">{Math.round(weather.main.temp)}°C</div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </main>
      <ToastContainer />
    </div>
  );
}

export default WeatherApp;
