import "./App.css";
import React, { Fragment, useState, useLayoutEffect } from "react";

import Background from "./components/Background";

import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import OpacityIcon from "@mui/icons-material/Opacity";
import SpeedIcon from "@mui/icons-material/Speed";
import getWeatherForecast from "./services/api";

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const getWeather = async (lat, lon) => {
    try {
      setWeather(await getWeatherForecast(lat, lon));
    } catch (error) {
      console.error(error, "Error on getWeather");
    } finally {
      setLoading(false);
      setShow(true);
      setTime(new Date().getHours());
    }
  };

  useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation(true);
      setLoading(true);
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  return (
    <Fragment>
      {!location && (
        <div className="alert">
          Você precisa habilitar a localização no browser
        </div>
      )}

      {loading && <div className="alert">Carregando o clima...</div>}

      {show && (
        <>
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
                  <SouthIcon />
                  {weather["main"]["temp_min"].toFixed()}º
                </li>
                <li>
                  <NorthIcon />
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
        </>
      )}
    </Fragment>
  );
}

export default App;
