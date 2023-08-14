import { useState, useEffect } from "react";

export const useWeather = (cityID, apiKey) => {
  const [temperature, setTemperature] = useState(null);
  const [minTemperature, setMinTemperature] = useState(null);
  const [maxTemperature, setMaxTemperature] = useState(null);

  useEffect(() => {
    const url =
      "https://api.openweathermap.org/data/2.5/weather?id=" +
      cityID +
      "&appid=" +
      apiKey +
      "&units=metric&lang=ja";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTemperature(Math.round(data.main.temp * 10) / 10);
        setMinTemperature(Math.round(data.main.temp_min * 10) / 10);
        setMaxTemperature(Math.round(data.main.temp_max * 10) / 10);
      })
      .catch(() => {
        console.log("ERROR");
      });
  }, [cityID, apiKey]);

  return { temperature, minTemperature, maxTemperature };
};
