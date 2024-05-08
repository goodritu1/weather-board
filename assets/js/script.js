const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const forecastCardDiv = document.querySelector(".forecast-card");
const currentWeatherDiv = document.querySelector(".currentWeather");
const API_Key = "6498761679a8651b9f26835393d69362";


const createWeatherCard = (cityName, weatherItem, index) => {
    if (index === 0) {
        return ` <div class ="details">
         <h2> ${cityName}(${weatherItem.dt_txt.split(" ")[0]})</h2>
        <h4>Temp: ${(weatherItem.main.temp - 278.73).toFixed(2)}</h4>
        <h4>Wind:${weatherItem.wind.speed} M/S </h4>
        <h4>Humidity: ${weatherItem.main.humidity}%</h4>
      </div>
      <div class ="image">
        <img src ="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt ="forecast">
        <h4> ${weatherItem.weather[0].description}</h4>
      </div>`;
    } else {
        return `<li class="card">
      <h3> (${weatherItem.dt_txt.split("")[0]})</h3>
      <img src ="https://openweather.org/img/wn/${weatherItem.weather[0].icon}@2x.png">
        <h4>Temp: ${(weatherItem.main.temp - 278.73).toFixed(2)} </h4>
        <h4>Wind:${weatherItem.wind.speed} M/S </h4>
        <h4>Humidity: ${weatherItem.main.humidity}%</h4>
        </li>`;
    }
}
    const getDetails = (cityName, lat, lon) => {
        // const lat =data.lat;
        // console.log (lat);
        // const lon =data.lat;
        // console.log (lon);

        const fiveDaysApi = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_Key}`;
        // the API returns forecast for every 3 hrs for 5 days.
        fetch(fiveDaysApi)
            .then(res => res.json())
            .then(data => {
                // we need to filter to only one forecast everyday
                const forecastDays = [];
                const fiveDaysForecast = data.list.filter(forecast => {
                    const forecastDate = new Date(forecast.dt_txt).getDate();
                    if (!forecastDays.includes(forecastDate)) {
                        return forecastDays.push(forecastDate);
                    }
                });
                // we have to clear previos data
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
                    forecastCardDiv.insertAdjacentHTML("beforeend", createWeatherCard(weatherItem));
                }).catch(() => {
                    alert("an error occured while fetchin the coordinates!");
                });
            });
    }
    //  .then(function (response){
    //     if(!response.ok) throw response;
    //     return response.json();
    //  })
    //  .then(function(data){


    //     const forecastDays =[];
    //     const fiveDaysForecast= data.list.filter(forecast => {
    //         const forecastDate =new Date (forecast.dt_txt).getDate();
    // if (!forecastDays.includes(forecastDate)){
    //     return forecastDays.push(forecastDate);
    // }
    //     });


    //     console.log(fiveDaysForecast);
    //     fiveDaysForecast.forEach(weatherItem => {
    //         forecastCardDiv.insertAdjacentHTML("beforeend", createWeatherCard(weatherItem))

    //     })
    //  }) .catch (function(error){
    //   alert("error");
    //  })
    // }

    const getCoordinates = function () {
        const cityName = cityInput.value.trim();
        if (!cityName)

            return;
        console.log(cityName);
        const limit = 5;
        const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_Key}`;
        //    console.log(apiUrl);

        fetch(apiUrl).then(res => res.json()).then(data => {
            if (!data.length) return alert(`no coordinates found for ${cityName}`);
            const { name, lat, lon } = data[0];
            getDetails(name, lat, lon);
        })
            .catch(() => {
                alert("And error occured while fetching the coordinates!");
            });
        // fetch(apiUrl)
        // .then(function (response) {
        //     if(!response.ok) 
        //     throw response;
        // return response.json();
        // })
        // .then(function(data){
        //     console.log("new data", data);
        //     if(!data.length) throw new Error('no coordinates found');

        //     // const [name,lat,lon]= data[0];


        //     getDetails(data[0]);
        // })
        // .catch(function(error){
        //     if (error.message ==='no coordinates found'){
        //     alert("error!! no coordinate found");
        // }else { 
        //     console.log("error", error);
        //             }
        //         });


    }



    searchButton.addEventListener("click", getCoordinates);

