// Initial values for city and units
let currCity = "Budaun";
let units = "metric";

const city = document.querySelector(".weatherCity");
const datetime = document.querySelector(".weather_datetime");
const weatherForecast = document.querySelector('.weatherForecast');
const weatherTemperature = document.querySelector(".temperature");
const weatherIcon = document.querySelector(".weatherIcon");
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const pressure = document.querySelector('.pressure');

// Event listener for form submission
document.querySelector(".search").addEventListener('submit', e => {
 // Prevent default form submission behavior
  e.preventDefault();
  // Update current city based on user input
  currCity = document.querySelector(".searchform").value;
   // Call the getWeather function to fetch and display updated weather
  getWeather();
   // Clear the search input field
  document.querySelector(".searchform").value = "";
});
// Function to convert timestamp to a readable date and time
function convertTimeStamp(timestamp, timezone) {
  const date = new Date(timestamp * 1000);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timezone: "long",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}
// Function to convert country code to the corresponding region name
function convertCountryCode(country) {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  return regionNames.of(country);
} 
// Function to fetch weather data from the OpenWeatherMap API
function getWeather() { 
  const API_KEY = '70acbc9a0d59214e12d90c203d8d933d';
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`)
    .then(response => {
      if (!response.ok){
        alert("Check spelling of City or Something went wrong!")
        throw new Error(`Request failed with status ${response.status}`)
      }
      return response.json()
    })
    .then(data => {
      city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
      datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
      weatherForecast.innerHTML = `<p>${data.weather[0].main}`;
      weatherTemperature.innerHTML = `${data.main.temp.toFixed()}&#176`;
      weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"  />`;
      humidity.innerHTML = `${data.main.humidity}%`;
      wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph" : "m/s"}`;
      pressure.innerHTML = `${data.main.pressure} hPa`;
    });
}
getWeather();