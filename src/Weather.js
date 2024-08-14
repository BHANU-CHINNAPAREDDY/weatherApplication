import React, { useEffect, useState } from "react";
import SearchWeather from "./SearchWeather";
import Spinner from "react-bootstrap/Spinner";

const Weather = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);

  async function handleSearch(search) {
    if (search) {
      await fetchWeatherData(search);
    }
  }
  async function fetchWeatherData(param) {
    try {
      //console.log(param);
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=537602a5d64180cc5abc22415be5e0d0`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      //console.log(data);
      if (data?.weather) {
        setLoading(false);
        setWeatherData(data);
      } else {
        alert("Enter City Name Correctly");
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }
  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  useEffect(() => {
    fetchWeatherData("Ongole");
  }, []);

  return (
    <div className="container">
      <SearchWeather
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name},<span>{weatherData?.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temp">{weatherData?.main?.temp}K</div>
          <p className="description">{weatherData?.weather[0]?.description}</p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">{weatherData?.wind?.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="humidity">{weatherData?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
