const searchButton = document.querySelector(".search-btn");
const cityInput = document.querySelector(".city-input");
const API_Key = "6498761679a8651b9f26835393d6936";
const getDetails=(cityName,lat,lon) =>{
 const fiveDaysApi= 'http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid={API_Key}';
 fetcg(fiveDaysApi)
 .then(function (response){
    if(!response.ok) throw response;
    return response.json();
 })
 .then(function(data){
    console.log(data);  
 }) .catch (function(error){
  alert("error");
 })
}
const getCoordinates =function() {
    const cityName = cityInput.value.trim();
    if(!cityName)
   
    return;
    console.log(cityName);
    const apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit={limit}&appid=${API_Key}';
   
    fetch(apiUrl)
    .then(function (response) {
        if(!response.ok) 
        throw response;
    return response.json();
    })
    .then(function(data){
        if(!data.length) throw new Error('no coordinates found');
        const [name, lat,lon]= data[0];

        console.log(name, lat,lon);
        getDetails(name, lat,lon);
    })
    .catch(function(error){
        if (error.message ==='no coordinates found'){
        alert("error");
    }else { 
        alert("error");
                }
            });

 
        }



searchButton.addEventListener("click", getCoordinates);

