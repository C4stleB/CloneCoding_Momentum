const locationNow = document.querySelector(".js-location");
const weatherNow = document.querySelector(".js-weather");
let weatherImg = document.querySelector(".js-weatherImg");
const API_KEY = '16526192e9081ec73aa34ed36071ff09';
const COORDS = 'coords';

function getWeather(lat, lon){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        const country = json.sys.country;
        const weather = json.weather[0].main;
        const weatherIconID = json.weather[0].icon;
        const weatherIcon = `http://openweathermap.org/img/wn/${weatherIconID}@2x.png`;
        weatherImg.src = weatherIcon;
        locationNow.innerText = ` ${place}, ${country}`;
        weatherNow.innerText = `${weather}, ${temperature}℃`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    
}

function handleGeoSuccess(position){
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();

}

init();