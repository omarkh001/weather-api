// search 

let inputSearch=document.getElementById("search")
 
// today date
let todayDate=document.getElementById("todaydate")
let numberDate=document.getElementById("numberDate")
let monthDate=document.getElementById("monthDate")
let cityDate=document.getElementById("cityDate")
let degDate=document.getElementById("degDate")
let imgIcon=document.getElementById("imgIcon")
let textDate=document.getElementById("textDate")
let umberllaDate=document.getElementById("umberllaDate")
let windDate=document.getElementById("windDate")
let speedDate=document.getElementById("speedDate")



// nextDate


let nextDate=document.querySelectorAll(".nextDate")
let imgNext=document.querySelectorAll(".imgNext")
let maxWeahter=document.querySelectorAll(".maxWeahter")
let minWeather=document.querySelectorAll(".minWeather")
let textNextDate=document.querySelectorAll(".textNextDate")




// fetch api
  async function getWeatherData(cityname){
let getWeatherData= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=cf924cb8c2d34c819bc134123242301&q=${cityname}&days=3`)
let weatherData= await getWeatherData.json()

return weatherData 
 }




// dispalytodaydata
function dispalyTodayData(data){

    let date=new Date()
    numberDate.innerHTML=date.getDate()
    todayDate.innerHTML=date.toLocaleString("en-us",{weekday:"long"})
    monthDate.innerHTML=date.toLocaleString("en-us",{month:"long"})
    cityDate.innerHTML=data.location.name
    degDate.innerHTML=data.current.temp_c+"c"
    imgIcon.setAttribute("src",data.current.condition.icon)
    textDate.innerHTML=data.current.condition.text
    umberllaDate.innerHTML=data.current.humidity+"%"
    windDate.innerHTML=data.current.wind_kph+"km/h"
    speedDate.innerHTML=data.current.wind_dir
}


dispalyNextData
function dispalyNextData(data){
let nextData= data.forecast.forecastday
console.log(nextData);
for(let i=0;i<2;i++){
    let afterDate=new Date(nextData[i+1].date)
    nextDate[i].innerHTML=afterDate.toLocaleDateString("en-us",{weekday:"long"})

    maxWeahter[i].innerHTML= nextData[i+1].day.maxtemp_c+"c"
    minWeather[i].innerHTML= nextData[i+1].day.mintemp_c+"c"
    textNextDate[i].innerHTML=nextData[i+1].day.condition.text
    imgNext[i].setAttribute("src",nextData[i+1].day.condition.icon)
}
}




// start app
 async function startApp(city="Cairo"){
    let weatherData=  await getWeatherData(city)
    if(!weatherData.error){
        dispalyTodayData(weatherData)
        dispalyNextData(weatherData)
    }

      
 
}
startApp()

inputSearch.addEventListener("input",function(){
    startApp(inputSearch.value)
    console.log(inputSearch.value);

})