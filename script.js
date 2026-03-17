const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("citySearch");
const weatherList = document.querySelector(".weather-conditions");
const apiKey = MY_API_KEY;
searchButton.addEventListener("click", searchCity);
cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchCity();
  }
});
async function searchCity() {
  if (cityInput.value.trim() === "") {
    alert("Please enter a city name");
    return;
  }
  try {
    weatherList.innerHTML = "<p>Loading...</p>";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`,
    );
    const data = await res.json();

    showWeather(data);
  } catch (error) {
    console.log("Error fetching data", error);
  }
}
function showWeather(data) {
  weatherList.innerHTML = ""; //clears weather list to show latest result
  if (data.cod !== 200) {
    weatherList.innerHTML = `<p>City not found</p>`;
    return;
  }
  let weatherLi = document.createElement("li");
  weatherLi.innerHTML = `<h2>${data.name}</h2>
  <p>Temperature: ${data.main.temp}°C</p>
 <p>Humidity: ${data.main.humidity}%</p>
 <p>Weather: ${data.weather[0].description}</p>`;
  weatherList.appendChild(weatherLi);
}
