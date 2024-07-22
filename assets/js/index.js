"use strict";

const WIND_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&daily=wind_speed_10m_max,wind_gusts_10m_max&forecast_days=3";
fetch(WIND_URL)
  .then((response) => response.json())
  .then((data) => forecastWind(data));

function forecastWind(windData) {
  const {
    daily: { wind_speed_10m_max, wind_gusts_10m_max },
    daily_units: {
      wind_speed_10m_max: wind_speed_10m_max_units,
      wind_gusts_10m_max: wind_gusts_10m_max_units,
    },
  } = windData;

  console.log(windData);

  function calcNumberBeaufort(windSpeed) {
    let number;
    if (windSpeed <= 1) {
      number = 0;
    } else if (windSpeed > 1 && windSpeed <= 6) {
      number = 1;
    } else if (windSpeed > 6 && windSpeed <= 12) {
      number = 2;
    } else if (windSpeed > 12 && windSpeed <= 20) {
      number = 3;
    } else if (windSpeed > 20 && windSpeed <= 29) {
      number = 4;
    } else if (windSpeed > 29 && windSpeed <= 40) {
      number = 5;
    } else if (windSpeed > 40 && windSpeed <= 49) {
      number = 6;
    }
    return number;
  }

  const windSpeed = wind_speed_10m_max[0];
  const windSpeed1 = wind_speed_10m_max[1];
  const windSpeed2 = wind_speed_10m_max[2];

  const windTable = document.querySelector(".wind");
  windTable.innerHTML = `
  <tr>
	  <th>Wind Speed</th>
	  <th>Wind Gusts</th>
	  <th>Beaufort scale number</th>
</tr>
<tr>
	  <td>${wind_speed_10m_max[0]} ${wind_speed_10m_max_units}</td>
	  <td>${wind_gusts_10m_max[0]} ${wind_gusts_10m_max_units}</td>
	  <td style="background-color:${calcNumberBeaufortColor(
      windSpeed
    )}">${calcNumberBeaufort(windSpeed)}</td>
</tr>
<tr>
	  <td>${wind_speed_10m_max[1]} ${wind_speed_10m_max_units}</td>
	  <td>${wind_gusts_10m_max[1]} ${wind_gusts_10m_max_units}</td>
	  <td style="background-color:${calcNumberBeaufortColor(
      windSpeed1
    )}">${calcNumberBeaufort(windSpeed1)}</td>
</tr>
<tr>
	  <td>${wind_speed_10m_max[2]} ${wind_speed_10m_max_units}</td>
	  <td>${wind_gusts_10m_max[2]} ${wind_gusts_10m_max_units}</td>
	  <td style="background-color:${calcNumberBeaufortColor(
      windSpeed2
    )}">${calcNumberBeaufort(windSpeed2)}</td>
</tr>
    `;
  function calcNumberBeaufortColor(windSpeed) {
    if (windSpeed <= 1) {
      return "#FBFAFE";
    } else if (windSpeed > 1 && windSpeed <= 6) {
      return "#AEF1F9";
    } else if (windSpeed > 6 && windSpeed <= 12) {
      return "#96F7DC";
    } else if (windSpeed > 12 && windSpeed <= 20) {
      return "#96F7B4";
    } else if (windSpeed > 20 && windSpeed <= 29) {
      return "#6FF46F";
    }
  }
}
