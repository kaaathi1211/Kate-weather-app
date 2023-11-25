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

function getForecast(city) {
  let apiKey = "5f10f79b9a549o4189b3te6048547a64";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastElement = document.querySelector("#forecast");

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  let forecastHtml = "<div class='forecast-container'>";

  days.forEach(function (day) {
    forecastHtml += `<div class="forecast-item">
         <p class="weather-forecast-date">${day}</p>
         <div class="weather-forecast-icon">☀️</div>
         <p class="weather-forecast-temperature">
           <span class="maximum">20°</span> 
           <span class="minimum">18°</span>
         </p>
       </div>`;
  });

  forecastHtml += "</div>";
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Sydney");
