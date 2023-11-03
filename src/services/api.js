import axios from "axios";

export default async function getWeatherForecast(
  lat,
  lon,
  lang = "pt",
  units = "metric"
) {
  const { data } = await axios.get(process.env.REACT_APP_BASE_URL, {
    params: {
      lat: lat,
      lon: lon,
      appid: process.env.REACT_APP_OPEN_WEATHER_KEY,
      lang: lang,
      units: units,
    },
  });

  return data;
}
