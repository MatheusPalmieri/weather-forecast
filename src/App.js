import "./App.css";
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

import Background from "./components/Background";

import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import OpacityIcon from "@mui/icons-material/Opacity";
import SpeedIcon from "@mui/icons-material/Speed";

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);
  const [time, setTime] = useState(null);

  let getWeather = async (lat, long) => {
    let res = await axios.get(
      "http://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat: lat,
          lon: long,
          appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
          lang: "pt",
          units: "metric",
        },
      }
    );
    setWeather(res.data);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(true);
      getWeather(position.coords.latitude, position.coords.longitude);
      setTime(new Date().getHours());
    });
  }, []);

  if (location === false) {
    return (
      <Fragment><div className="alert">Você precisa habilitar a localização no browser</div></Fragment>
    );
  } else if (weather === false) {
    return <Fragment><div className="alert">Carregando o clima...</div></Fragment>;
  } else {
    return (
      <Fragment>
        <Background time={time} />
        <section className="container">
          <h3>
            <div className="temp">{weather["main"]["temp"].toFixed()}º</div>
            <div className="description">
              {weather["weather"][0]["description"]}.
            </div>
          </h3>

          <div className="hr"></div>

          <ul className="list">
            <div className="top">
              <li>
                <div className="icon-temp-min">
                  <SouthIcon />
                </div>
                {weather["main"]["temp_min"].toFixed()}º
              </li>
              <li>
                <div className="icon-temp-max">
                  <NorthIcon />
                </div>
                {weather["main"]["temp_max"].toFixed()}º
              </li>
            </div>
            <div className="bottom">
              <li>
                <div className="icon-temp">
                  <OpacityIcon color="action" />
                </div>
                Pressão {weather["main"]["pressure"]}º hpa
              </li>
              <li>
                <div className="icon-temp">
                  <SpeedIcon />
                </div>
                Umidade {weather["main"]["humidity"]}%
              </li>
            </div>
          </ul>
        </section>
      </Fragment>
    );
  }
}

export default App;
