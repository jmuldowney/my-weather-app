function formatDate(date) {
  let dayIndex = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let monthIndex = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentDay = dayIndex[date.getDay()];
  let currentMonth = monthIndex[date.getMonth()];
  let currentDate = date.getDate();
  let currentYear = date.getFullYear();
  let updatedDate = `${currentDay} ${currentMonth} ${currentDate}, ${currentYear}`;
  return `${updatedDate}`;
}

function formatTime(date) {
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  if (currentHour > 12) {
    currentHour = currentHour - 12;
    currentMinutes = `${currentMinutes} PM`;
  } else {
    currentMinutes = `${currentMinutes} AM`;
  }

  let updatedTime = `${currentHour}:${currentMinutes}`;
  return `${updatedTime}`;
}
function searchCity(city) {
  let units = "metric";
  let apiKey = "ee70fb47b60aefb5bb4a02bfe788e745";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  console.log(response.data.weather[0].description);
  document.querySelector("#high-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°/`;
  document.querySelector("#low-temp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].description.toUpperCase()}`;
}

function getCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  searchCity(city);
}
function showCurrentTemperature(response) {
  let currentTemperature = Math.round(response.data.main.temp);
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  let currentCity = response.data.name;
  let currentCountry = response.data.sys.country;
  let currentCityElement = document.querySelector("#city");
  currentTemperatureElement.innerHTML = `${currentTemperature}°C`;
  currentCityElement.innerHTML = currentCity;
  console.log(response);
  document.querySelector("#high-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°/`;
  document.querySelector("#low-temp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].description.toUpperCase()}`;
  document.querySelector("#feels-like").innerHTML = `Feels like...${Math.round(
    response.data.main.feels_like
  )}°`;
}

function displayCurrentWeather(event) {
  navigator.geolocation.getCurrentPosition(getLocation);
  function getLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiKey = "47bd7fa6fb10a86835a08910b18c04f6";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showCurrentTemperature);
  }
}

let now = new Date();
document.querySelector("#date").innerHTML = formatDate(now);
document.querySelector("#time").innerHTML = formatTime(now);

let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", getCity);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", displayCurrentWeather);
