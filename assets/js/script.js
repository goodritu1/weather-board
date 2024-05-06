const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const API_Key = "6498761679a8651b9f26835393d69362";

const getDetails=(data) =>{
    const lat =data.lat;
    console.log (lat);
    const lon =data.lat;
    console.log (lon);

 const fiveDaysApi= `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_Key}`;
 fetch(fiveDaysApi)
 .then(function (response){
    if(!response.ok) throw response;
    return response.json();
 })
 .then(function(data){
    
   
    const forecastDays =[];
    const fiveDaysForecast= data.list.filter(forecast => {
        const forecastDate =new Date (forecast.dt.txt).getDate();
if (!forecastDays.includes(forecastDate)){
    return forecastDays.push(forecastDate);
}
    });
    console.log(fiveDaysForecast);
 }) .catch (function(error){
  alert("error");
 })
}

const getCoordinates =function() {
    const cityName = cityInput.value.trim();
    if(!cityName)
   
    return;
    console.log(cityName);
    const limit = 5;
    const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_Key}`;
   console.log(apiUrl);
    fetch(apiUrl)
    .then(function (response) {
        if(!response.ok) 
        throw response;
    return response.json();
    })
    .then(function(data){
        console.log("new data", data);
        if(!data.length) throw new Error('no coordinates found');

        // const [name,lat,lon]= data[0];

        
        getDetails(data[0]);
    })
    .catch(function(error){
        if (error.message ==='no coordinates found'){
        alert("error!! no coordinate found");
    }else { 
        console.log("error", error);
                }
            });

 
        }



searchButton.addEventListener("click", getCoordinates);

