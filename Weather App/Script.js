const apikey="c569e786a3888ce57aaa71465ce53d83";
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox =document.querySelector(".search input");
const searchbtn =document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");
const detail=document.querySelector(".weather");

async function checkweather(city)
{
    const response=await fetch(apiurl + city+`&appid=${apikey}`);
    var data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+ "°C";
    document.querySelector(".humidity").innerHTML=data.main.humidity + "%";
    document.querySelector(".wind-speed").innerHTML=data.wind.speed + "km/h";

    console.log("Weather Condition:",data.weather[0].main);
    if(data.weather[0].main == 'Clouds')
    {
        weatherIcon.src="images/clouds.png";
    }
    else if(data.weather[0].main == 'Clear')
    {
        weatherIcon.src="images/clear.png";
    }
    else if(data.weather[0].main == 'Drizzle' && 'Haze')
    {
        weatherIcon.src="images/drizzle.png";
    }
    else if(data.weather[0].main == 'Mist')
    {
        weatherIcon.src="images/mist.png";
    }
    else if(data.weather[0].main == 'Rain')
    {
        weatherIcon.src="images/rain.png";
    }
    else if(data.weather[0].main == 'Snow')
    {
        weatherIcon.src="images/snow.png";
    }
    else
    {
        weatherIcon.src="images/404.jpg";
    }
    
   /* if(data.name == "Undefined")
    {
        const erorimg=document.createElement("img");
        erorimg.src="images/404.img";
        detail.appendChild(erorimg);
    }*/
}

searchbtn.addEventListener("click",()=>{
    checkweather(searchbox.value);
})
