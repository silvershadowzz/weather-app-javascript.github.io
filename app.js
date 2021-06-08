// api key : 52e2c4f26c21ce9ba51e4dc19ad354a0
//SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const loactionElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

//app data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

//app const and vars
const KELVIN = 273;
//API KEY
const key = "60d832811e851c0af8c1e49a857496bb";

//check if browser support geolocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation</p>";
}




// SET USER'S POSITION
 function setPosition(position){
     let latitude = position.coords.latitude;
     let longitude = position.coords.longitude;

     geoWeather(latitude, longitude);

 }

 //show error if any geolocation error
 function showError(error){
     notificationElement.style.display ="block";
     notificationElement.innerHTML = `<p> ${error.message} </p>`;
 }

 //get weather from api
 function geoWeather(latitude, longitude){
     let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

     fetch(api)
     .then(function(response){
         let data = response.json();
         return data;
     })
     .then(function(data){
         weather.temperature.value = Math.floor(data.main.temp - KELVIN);
         weather.description = data.weather[0].description ;
         weather.iconId = data.weather[0].icon;
         weather.city = data.name;
         weather.country = data.sys.country;
     })
     .then(function(){
         displayWeather();
     });
 }

 //Display weather to ui
 function displayWeather(){
     iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
     tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
     descElement.innerHTML = weather.description;
     loactionElement.innerHTML = `${weather.city}, ${weather.country}`;
 }

 //c to f
 function celsiusTofahrenheit(temperature){
     return (temperature * 9/5) + 32;
 }
 //when user clicks on temperature element
 tempElement.addEventListener("click", function(){
     if(weather.temperature.unit == "celsius"){
         let fahrenheit = celsiusTofahrenheit(weather.temperature.value);
         fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
         weather.temperature.unit = "fahrenheit";

        }else{
            tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
            weather.temperature.unit = "celsius";
        }
 })