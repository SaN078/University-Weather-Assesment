const apiKey = "91404bc4c265d659deaeea4776a2e91a";
//creating literal
let weather = {
  fetchWeather: function (city) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerHTML = `Weather in ${name}`;
    document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerHTML = description;
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".humidity").innerHTML = `<b>Humidity</b>: ${data.main.humidity}%`;
    document.querySelector(".pressure").innerHTML = `<b>Pressure</b>: ${data.main.pressure}Pa`;
    document.querySelector(".wind").innerHTML = `<b>Wind Speed</b>: ${data.wind.speed}km/h`;
    document.querySelector(".card").classList.remove("loading");
    document.querySelector(".card").classList.add("loaded");
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
//Search when the search button is clicked
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});
//search when enter key is pressed
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
}); 

//default city function call
weather.fetchWeather("Phuket");