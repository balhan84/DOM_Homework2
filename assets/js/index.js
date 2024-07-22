"use strict";

const WIND_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&daily=wind_speed_10m_max,wind_gusts_10m_max&forecast_days=3";
fetch(WIND_URL)
  .then((response) => response.json())
  .then((data) => forecastWind(data));

function forecastWind(windData) {
  //   dogImage.src = imageData.message;
  console.log("windData", windData);

  //   const windArticle = document.querySelector(".wind");
  //   windArticle.innerHTML =
}
