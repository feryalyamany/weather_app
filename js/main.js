let searchInput = document.getElementById("searchInput");
// let myBtn=document.getElementById('myBtn');
let myKey = "7c3ee5847d9e46e2a9b131447220911";

//  current weather

let day = document.getElementById("day"),
  todaydate = document.getElementById("todaydate"),
  city = document.getElementById("city"),
  temp = document.getElementById("temp"),
  icon = document.getElementById("icon"),
  desc = document.getElementById("desc"),
  humidity = document.getElementById("humidity"),
  wind = document.getElementById("wind"),
  dir = document.getElementById("dir");

//  next days

let nxtday = document.getElementsByClassName("nextDay"),
  nxtIcon = document.getElementsByClassName("nxtIcon"),
  max = document.getElementsByClassName("max"),
  min = document.getElementsByClassName("min"),
  nextDesc = document.getElementsByClassName("nextDesc");

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  monthName = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],

  apiResponse,
  data,
  currentCity= 'Cairo';

async function getData() {
   apiResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${myKey}&q=${currentCity}&days=3`
  );
   data = await apiResponse.json();
  console.log(data);
  getCurrentWeather()
  getTheNextDays()
}
getData();

function getCurrentWeather() {
  let date = new Date();
  day.innerHTML = days[date.getDay()];
  todaydate.innerHTML =` ${date.getDate()} ${monthName[date.getMonth()]}` ;
   city.innerHTML= data.location.name;
   temp.innerHTML=data.current.temp_c +` °C`;
   icon.setAttribute('src', `https:${data.current.condition.icon}`);
   desc.innerHTML=data.current.condition.text;
   humidity.innerHTML=data.current.humidity +` %`;
   wind.innerHTML=data.current.wind_kph +` km/h`;
   dir.innerHTML=data.current.wind_dir;
};


 function getTheNextDays(){
   for(let i=0; i<nxtday.length; i++){
    nxtday[i].innerHTML= days[new Date(data.forecast.forecastday[i+1].date).getDay()];
    nxtIcon[i].setAttribute('src', `https:${data.forecast.forecastday[i+1].day.condition.icon}`);
    max[i].innerHTML=data.forecast.forecastday[i+1].day.maxtemp_c + ` °C`;
    min[i].innerHTML=data.forecast.forecastday[i+1].day.mintemp_c + ` °C`;
    nextDesc[i].innerHTML=data.forecast.forecastday[i+1].day.condition.text;
   }

   }


   searchInput.addEventListener('keyup', ()=>{
    currentCity= searchInput.value
    console.log(currentCity)
    getData()
   })


