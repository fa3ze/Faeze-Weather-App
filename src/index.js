function formatDate(timestamp) {
  let date = new Date(timestamp);
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes} `;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thusday", "Friday", "Sat", "sunday", "monday", "tuesday"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <div class="col-2">
              <div class="weather-forcast-date">${day}</div>
              <img
                src="http://openweathermap.org/img/wn/10d@2x.png"
                alt="description"
                class="future-icon"
                width="36px"
              /><br />
              <div class="weather-forcast-max-temp">17°C</div>
              <div class="weather-forcast-min-temp">9°C</div>
            </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let feelsElement = document.querySelector("#feelslike");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celciusTemperature = response.data.main.temp;
  feelsCelciusTemperature = response.data.main.feels_like;

  temperatureElement.innerHTML = Math.round(celciusTemperature);
  cityElement.innerHTML = response.data.name;
  feelsElement.innerHTML = Math.round(feelsCelciusTemperature);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "5c33c2674a0cd16815872b2fdd978d22";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
}

function displayFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celciusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(farenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}
let celciusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

//trying coversion for feels

function DisplayFeelsFarenheitTemperature(event) {
  event.preventDefault();
  let feelsElement = document.querySelector("#feelslike");
  feelsCelciusLink.classList.remove("feels-active");
  feelsFarenheitLink.classList.add("feels-active");
  let feelsFarenheitTemperature = (feelsCelciusTemperature * 9) / 5 + 32;
  feelsElement.innerHTML = Math.round(feelsFarenheitTemperature);
}

function displayFeelsCelciusTemperature(event) {
  event.preventDefault();
  feelsCelciusLink.classList.add("feels-active");
  feelsFarenheitLink.classList.remove("feels-active");
  let feelsElement = document.querySelector("#feelslike");
  feelsElement.innerHTML = Math.round(feelsCelciusTemperature);
}
let feelsCelciusTemperature = null;

let feelsFarenheitLink = document.querySelector("#feels-farenheit-link");
feelsFarenheitLink.addEventListener("click", DisplayFeelsFarenheitTemperature);

let feelsCelciusLink = document.querySelector("#feels-celcius-link");
feelsCelciusLink.addEventListener("click", displayFeelsCelciusTemperature);

search("Tehran");

displayForecast();
