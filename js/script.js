let contact = document.querySelector('.contact');
let home = document.querySelector('.home');
let today = document.querySelector('#today');
let month = document.querySelector('#month');
let number = document.querySelector('#number');
let region = document.querySelector('#region');
let temperature = document.querySelector('#temperature');
let state = document.querySelector('#state');
let todayImage = document.querySelector('#todayimage');
let umbrella = document.querySelector('#umbrella');
let windData = document.querySelector('#wind');
let compass = document.querySelector('#compass');

let nextDay = document.querySelectorAll('.nextDay');
let maxTemp = document.querySelectorAll('.maxtemp');
let minTemp = document.querySelectorAll('.mintemp');
let st = document.querySelectorAll('.st');
let nextImage = document.querySelectorAll('.nextImage');


let search = document.querySelector("#search")



contact.addEventListener('click', function () {
  window.location.replace('./contact.html');
});

home.addEventListener('click', function () {
  window.location.replace('./index.html');
});

async function getData(cityName) {
  var res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=f73d4d1fceb84889bb4135432242506&q=${cityName}&days=3`
  );
  res = await res.json();
  return res;
}

function todayDisplayData(data) {

  let todayDate = new Date(); 
  today.innerHTML = todayDate.toLocaleDateString("en-us",{weekday:"long"});  
  month.innerHTML = todayDate.getDate();  
  number.innerHTML = todayDate.toLocaleDateString("en-us",{month:"long"});  

  region.innerHTML = data.location.name;
  temperature.innerHTML = data.current.temp_c + `<sup>o</sup>C`;
  todayImage.setAttribute('src', data.current.condition.icon);
  state.innerHTML = data.current.condition.text;
  umbrella.innerHTML = data.current.humidity + `%`;
  windData.innerHTML = data.current.wind_kph + `km/h`;
  compass.innerHTML = data.current.wind_dir;
}

function getNextData(data) {
  let forCast = data.forecast.forecastday;
  
  for (let i = 0; i < 2; i++) {
    let nextDate = new Date(forCast[i+1].date);
    nextDay[i].innerHTML = nextDate.toLocaleDateString('en-us', {
      weekday: 'long',
    }); 


    maxTemp[i].innerHTML = forCast[i + 1].day.maxtemp_c + `<sup>o</sup>C`;
    minTemp[i].innerHTML = forCast[i + 1].day.mintemp_c + `<sup>o</sup>C`;
    nextImage[i].setAttribute('src', forCast[i + 1].day.condition.icon);

    st[i].innerHTML = forCast[i + 1].day.condition.text;
  }
}

async function startApp(cityName = "cairo") {
  let data = await getData(cityName);
  if(!data.error)
    {
      todayDisplayData(data);
      getNextData(data);

    }
}

startApp();

search.addEventListener("keyup",function(){
    startApp(search.value);
})
