const API_KEY = 'c1cddad142f39f63878465c2412bb1d3';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const ICON_URL = 'http://openweathermap.org/img/wn/'

const locationEl = document.getElementById('location');
const weatherEl = document.getElementById('weather');
const searchEl = document.getElementById('search')
const form = document.getElementById('form')
const img = document.getElementById('img')
const temp = document.getElementById('temp')

async function getWeather(location) {
    const url = `${API_URL}?q=${location}&appid=${API_KEY}&units=metric`
    const res = await fetch(url);
    const resData = await res.json();
    img.src = `${ICON_URL}${resData.weather[0].icon}@2x.png`

    locationEl.innerText = resData.name;
    temp.innerHTML = `${resData.main.temp}<small> <span>&#176;</span>C</small>`;
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(searchEl.value){
        getWeather(searchEl.value);
    }
})

getWeather('Singapore');