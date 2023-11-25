function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let feelsElement = document.querySelector("#feels");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  timeElement.innerHTML = formatDate(date);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  feelsElement.innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}°C`;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  temperatureElement.innerHTML = `${Math.round(
    temperature
  )}<span class="small">°C</span>`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"></img>`;

  getForecast(response.data.city);

  function formatDate(date) {
    let day = date.getDay();
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let dayName = days[day];
    return `${dayName}, ${hours}:${minutes < 10 ? "0" + minutes : minutes}, `;
  }
}

function searchCity(city) {
  let apiKey = "5f10f79b9a549o4189b3te6048547a64";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "5f10f79b9a549o4189b3te6048547a64";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5)
      forecastHtml += `<div class="forecast-item">
         <p class="weather-forecast-date">${formatDay(day.time)}</p>
         <div class="weather-forecast-icon">
         <img src="${day.condition.icon_url}">
         </div>
         <p class="weather-forecast-temperature">
           <span class="maximum">${Math.round(day.temperature.maximum)}°</span> 
           <span class="minimum">${Math.round(day.temperature.minimum)}°</span>
         </p>
       </div>`;
  });

  forecastHtml += "</div>";

  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Sydney");
