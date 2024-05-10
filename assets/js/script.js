const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const forecastCardDiv = document.querySelector(".forecast-card");
const currentWeatherDiv = document.querySelector(".currentWeather");
const API_Key = "6498761679a8651b9f26835393d69362";


const createWeatherCard = (cityName, weatherItem, index) => {
    if (index === 0) {
        return ` <div class ="details">
         <h2> ${cityName}(${weatherItem.dt_txt})</h2>
        <h4>Temp: ${(weatherItem.main.temp).toFixed(2)}</h4>
        <h4>Wind:${weatherItem.wind.speed} M/S </h4>
        <h4>Humidity: ${weatherItem.main.humidity}%</h4>
      </div>
      <div class ="image">
        <img src ="https://openweathermap.org/img/w/${weatherItem.weather[0].icon}.png" alt ="forecast">
        <h4> ${weatherItem.weather[0].description}</h4>
      </div>`;
    } else {
        return `<li class="card">
      <h3> (${weatherItem.dt_txt})</h3>
      <img src ="https://openweathermap.org/img/w/${weatherItem.weather[0].icon}.png">
        <h4>Temp: ${(weatherItem.main.temp).toFixed(2)} </h4>
        <h4>Wind:${weatherItem.wind.speed} M/S </h4>
        <h4>Humidity: ${weatherItem.main.humidity}%</h4>
        </li>`;
    }
}
const getDetails = (cityName, lat, lon) => {
 

    const fiveDaysApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_Key}&units=imperial`;
    // the API returns forecast for every 3 hrs for 5 days.
    fetch(fiveDaysApi)
        .then(res => res.json())
        .then(data => {
            console.log(data.list);
            // we need to filter to only one forecast everyday
            const forecastDays = [];
            const fiveDaysForecast = data.list.filter(forecast => {
                return forecast.dt_txt.includes("12:00:00");
              
            });
            // we have to clear previos data
            console.log(fiveDaysForecast);
            cityInput.value = "";
            forecastCardDiv.innerHTML = "";
            currentWeatherDiv.innerHTML = "";

            // console.log(fiveDaysForecast);
            fiveDaysForecast.forEach((weatherItem, index) => {
                if (index === 0) {
                    currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
                } else {
                    forecastCardDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
                }
                // adding weather cards to the page
               
            })
        }).catch(() => {
            alert("an error occured while fetchin the coordinates!");
        });
}


const getCoordinates = function () {
    const cityName = cityInput.value.trim();
    if (!cityName)

        return;
    console.log(cityName);
    const limit = 5;
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_Key}`;
    //    console.log(apiUrl);

    fetch(apiUrl).then(res => res.json()).then(data => {
        if (!data.length) return alert(`no coordinates found for ${cityName}`);
        console.log(data);
        const { name, lat, lon } = data[0];
        getDetails(name, lat, lon);
    })
        .catch(() => {
            alert("And error occured while fetching the coordinates!");
        });


}



searchButton.addEventListener("click", getCoordinates);

