import React, { useState, useEffect } from "react";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";
import drizzle_icon from "../assets/drizzle.png";

const WeatherApp = () => {
  let api_key = "f7ffc8f3e53e5d7361c0edcbe54a4f5f";

  const [city, setCity] = useState(() => "Chennai");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [icon, setIcon] = useState(cloud_icon);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();
      setTemperature(data.main.temp);
      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setIcon(data.weather[0].icon);

      if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
        setIcon(clear_icon);
      } else if (
        data.weather[0].icon === "02d" ||
        data.weather[0].icon === "02n"
      ) {
        setIcon(cloud_icon);
      } else if (
        data.weather[0].icon === "03d" ||
        data.weather[0].icon === "03n" ||
        data.weather[0].icon === "04d" ||
        data.weather[0].icon === "04n"
      ) {
        setIcon(drizzle_icon);
      } else if (
        data.weather[0].icon === "09d" ||
        data.weather[0].icon === "09n" ||
        data.weather[0].icon === "10d" ||
        data.weather[0].icon === "10n"
      ) {
        setIcon(rain_icon);
      } else if (
        data.weather[0].icon === "11d" ||
        data.weather[0].icon === "11n"
      ) {
        setIcon(snow_icon);
      } else if (
        data.weather[0].icon === "13d" ||
        data.weather.icon === "13n"
      ) {
        setIcon(snow_icon);
      } else {
        setIcon(clear_icon);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const search = async () => {
    try {
      if (city === "") {
        alert("Enter city name");
        return;
      }
      fetchData();
    } catch (error) {
      console.log("Error searching:", error);
    }
  };

  return (
    <div className="grid justify-center items-center bg-black min-h-[93vh] sm:min-h-[700px]">
      <div className="grid justify-center items-center bg-gradient-to-br from-cyan-500 to-blue-700 ... min-h-[600px] w-[350px] sm:w-[500px] rounded-lg shadow-md text-white p-0">
        <form className="max-w-md mx-auto">
          <label className="mb-2 text-sm font-poppins text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={(event) => {
                setCity(event.target.value);
              }}
              value={city}
              type="search"
              id="city"
              className="block min-w-[320px] p-4 ps-10 text-sm font-poppins text-gray-900 border  rounded-2xl  focus:ring-blue-500 focus:border-blue-500 bg-black border-zinc-900 dark:placeholder-gray-400 dark:text-white "
              placeholder="Search City"
              required
            />
            <button
              onClick={(event) => {
                event.preventDefault(); // Prevent default form submission behavior
                console.log("button clicked");
                search(event); // Pass the event object to the search function
              }}
              type="submit"
              className="text-white font-poppins absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        {
          //weather card
        }
        <div className="grid justify-center items-center">
          <img
            className="object-cover h-28 w-28 sm:w-36"
            src={icon} // Replace with the actual icon URL
            alt="Weather Icon"
          ></img>
        </div>
        <div id="temperature" className="text-center font-poppins text-7xl  ">
          {temperature}&deg;C
        </div>
        <div className="text-center font-poppins text-4xl font-semibold">
          {city}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-2 bg-black/50 p-4 rounded-lg shadow-md backdrop-blur-sm">
            <img src={humidity_icon} className="h-6 sm:h-8"></img>
            <h2 id="humidity" className="font-poppins text-xl ">
              {humidity}% .
              <spn>
                <p className="font-poppins text-sm">Humidity</p>
              </spn>
            </h2>
          </div>
          <div className="flex justify-center items-center gap-2 bg-black/50 p-4 rounded-lg shadow-md backdrop-blur-sm">
            <img src={wind_icon} className="h-6 sm:h-8"></img>
            <h2 id="wind" className="font-poppins text-xl">
              {wind} km/h
              <span>
                {" "}
                <p className="font-poppins text-sm">Wind Speed</p>
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
