import { useState,useEffect} from "react";
import BgCl from "./assets/BgCloud.jpg";
import rainyy from "./assets/rainy.jpg";
import Loader from"./assets/loading.gif";
import Sunny from "./assets/sunny-icon-5.png";
import cloudy from "./assets/cloudy.png";
import rain from "./assets/rain.png";
import sunny from "./assets/sunny.png";
import snow from "./assets/snow.png";



const Background=()=>{


  const [Data,setData]=useState({})
  const [Cityname ,setCityname]=useState("")
  const [Loading,setLoading]=useState(false)
      
const API_key="30cd0b0b238305527307caddfa5d983f"

useEffect(()=>{
      const getDefaultCity =async()=>{
        setLoading(true)
        const URL=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=${API_key}`)
        const response = await URL.json() 
        const fetcdatah=response
        console.log(fetcdatah)
        setData(fetcdatah)

        setLoading(false)

      }
      getDefaultCity()

},[]);




const getWeatherApi=async()=>
  
{
  if(!Cityname==""){
    setLoading(true)
  
   const url=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Cityname}&appid=${API_key}`)
   const response = await url.json() 
   const fetcdatah=response
   console.log(fetcdatah)
   setData(fetcdatah)
   setLoading(false)
   
  }


}
const Celcius=(kelvin)=>{
  return(kelvin-273.15).toFixed(2);
}

const BackgroundImages={
  Clear:"https://github.com/myprojectideas/Weather_application/blob/main/src/assets/images/Clear.jpg?raw=true",
  Clouds: "https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?cs=srgb&dl=pexels-pixabay-158163.jpg&fm=jpg",
  Rain:"https://github.com/myprojectideas/Weather_application/blob/main/src/assets/images/Rainy.jpg?raw=true",
  Snow:"https://static.boredpanda.com/blog/wp-content/uuuploads/winter-landscapes/winter-landscapes-8.jpg",
  Haze:"https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?cs=srgb&dl=pexels-pixabay-158163.jpg&fm=jpg",
  Mist:"https://images.pexels.com/photos/158163/clouds-cloudporn-weather-lookup-158163.jpeg?cs=srgb&dl=pexels-pixabay-158163.jpg&fm=jpg",
  Thunderstorm:"https://images.unsplash.com/photo-1519692933481-e162a57d6721?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29uJTIwaW4lMjByYWlufGVufDB8fDB8fHww",
 cod:"https://htmlcolorcodes.com/assets/images/colors/baby-blue-color-solid-background-1920x1080.png",
 Drizzle:"https://github.com/myprojectideas/Weather_application/blob/main/src/assets/images/Rainy.jpg?raw=true"

}

backIMg=(Data.weather && Data?.cod!=="404") ? BackgroundImages[Data.weather[0].main] : BackgroundImages["cod"];

const divStyle={
  backgroundImage:`url(${backIMg})`,
  backgroundSize: "cover",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",

};
const WeatherImages={
  Clear:sunny,
  Clouds:cloudy,
  Rain:rain,
  Snow:snow,
  Haze:cloudy,
  Mist:cloudy,
  Thunderstorm:rain,
  Drizzle:rain

}


const WeatherImage=Data?.weather ? WeatherImages[Data.weather[0].main] :WeatherImages["Clear"];
const currentDate=new Date()
const daysOfWeek=["Sun" , "Mon", "Tue" ,"Wed", "Thu","Fri","Sat"]
const Month=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

const dayOfWeek=daysOfWeek[currentDate.getDay()]
const month=Month[currentDate.getMonth()]
const dateOfMonth=currentDate.getDate()
console.log(dateOfMonth)



    
    return(
        <>
        <div className="heading">
        <h1>Weather Check</h1>
        </div>
        <div style={divStyle}>
            <div className="main">



           <div className="search">
        <div className="Search-bar">
            <input type="text" placeholder="Enter location" value={Cityname} onChange={(e)=>{setCityname(e.target.value)}} onKeyDown={(e)=>{
              if(e.key==="Enter"){getWeatherApi();}}}/> {/*This sets up an anonymous function to handle the onKeyDown event. Inside this anonymous function, getWeatherApi is called conditionally if the key pressed is "Enter".*/}
            <i className="fa-solid fa-magnifying-glass" onClick={getWeatherApi}></i> {/*This sets up the event handler to call getWeatherApi when the icon is clicked. */}
          </div>
          <div className="search-top">
           <i className="fa-solid fa-location-dot"></i>
           <div className="cityname">{Data.name}</div>
           </div>
         </div>

         {Loading ? (<img className="loader" src={Loader}/>) :Data.cod=="404"? (<div className="not">City NotFound 🙄</div>):(
            <div className="Weather">
             < div className="Weather-date">
                <h3>{dayOfWeek}, {dateOfMonth} {month}</h3>
              </div>
            <div className="About-Weather">
              <img className="pic"src={WeatherImage ? WeatherImage :null}/>
              <div className="Temp">{(Data?.main) ?`${Celcius(Data?.main?.temp)}°`:null }</div>{/* null matlab empty space kuch nhi aaenga */}
              <div className="Weather-type">{(Data?.weather) ? `${Data?.weather[0]?.main}` :""}</div>{/*"" matlab empty space kuch nhi aaenga */}
               
               
            </div>

          

            <div className="Weather-data">
                <div className="Humidity">
                    <div className="data-name">Humidity</div>
                    <i className="fa-solid fa-droplet"></i>
                    <div className="data">{(Data?.main) ? `${Data.main.humidity}`: null}%</div>
                </div>

                <div className="Wind">
                    <div className="data-name">Wind Speed</div>
                    <i className="fa-solid fa-wind"></i>
                    <div className="data">{(Data?.wind) ? `${Data.wind.speed.toFixed(0)}`:null} km/hr</div>
                </div>
            </div>
            </div>)}
            </div>
            

           </div>
           </>
    
        
        
    )
  

}



  export default Background;



