import "./App.css";
import React, { useState } from "react";
import ReactLoading from "react-loading";
import Search from "./components/search/Search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import { openWeatherApi, openWeatherMyApiKey } from "./components/Api";
import Forecast from "./components/forecast/Forcast";
import Forcast from "./components/forecast/Forcast";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentForcast, setCurrentForcast] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleOnSearchChange = (searchData) => {
    setIsSearching(true);
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${openWeatherApi}weather?lat=${lat}&lon=${lon}&appid=${openWeatherMyApiKey}&units=metric`
    );

    const currentForcastFetch = fetch(
      `${openWeatherApi}forecast?lat=${lat}&lon=${lon}&appid=${openWeatherMyApiKey}&units=metric`
    );

    Promise.all([currentWeatherFetch, currentForcastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setCurrentForcast({ city: searchData.label, ...forcastResponse });
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="container">
      <Search
        setIsSearching={setIsSearching}
        onSearchChange={handleOnSearchChange}
      />
      {isSearching && !currentWeather ? (
        <div className="loader">
          <ReactLoading
            type={"bars"}
            color={"#000000"}
            height={500}
            width={500}
          />
        </div>
      ) : (
        <></>
      )}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {currentForcast && <Forcast data={currentForcast}/>}
    </div>
  );
};

export default App;
