import React, { useState}  from "react";
import "./css/Weather.css";
import sunny from "../component/Assets/sunny.png";
import { format } from 'date-fns';
// import Weatherservice from "../component/Weatherservice/Weatherservice";
const Weather=()=>{
    const [city,setcity]= useState("");
    const [data,setdata]= useState("");
    const [sunrise,setsunrise]= useState('');
    const [sunset,setsunset]=useState('');
    const [localTimes,setlocalTime]=useState('');
    const getweatherdata=async()=>{    
       try{
            // let data;
           if(city.length>0){
                let api_key="21d275e5e9900cde795ae57c96128a1d";
                let api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
                await fetch(api).then((res)=>res.json()).then((d)=>{d===null?alert("Not Found"):setdata(d)});
                const sunrise=(e)=>{
                    let date=new Date(e*1000);
                    let formatDate=format(date,' hh:mm a');
                    // formate.setTimeZone(TimeZone.getTimeZone("GMT+5:30"));
                    setsunrise(formatDate);
                }
                const sunset=(e)=>{
                     let date=new Date(e*1000);
                     let formatDate=format(date,'hh:mm a');
                     // formate.setTimeZone(TimeZone.getTimeZone("GMT+5:30"));
                     setsunset(formatDate);
                }
                const localTime=()=>{
                     let date=new Date();
                     let formatDate=format(date,'E , dd-MM-yyyy HH:mm:ss a');
                     // formate.setTimeZone(TimeZone.getTimeZone("GMT+5:30"));
                     setlocalTime(formatDate);
                }
                localTime();
                sunset(data.sys.sunset);
                sunrise(data.sys.sunrise);
            }
            else{
                alert("Plase Enter Your Location");
            } 
        }
        catch(err){
            console.log(err);
       }
      
    }
    return(
        <>
            <section className="main">
                <div className="container">
               
                    <div className="row">
                        <div>
                            <div className="mt-4">
                                <ul className="nav d-flex justify-content-around">
                                    <li>India</li>
                                    <li>London</li>
                                    <li>USA</li>
                                    <li>Tokyo</li>
                                    <li>Toronto</li>
                                </ul> 
                            </div>
                            <div className="my-5">
                                <div className="d-flex mb-2 w-75 m-auto justify-content-center input-group input_list ">
                                    <input type="text" name="city" onChange={(e)=>setcity(e.target.value)} value={city} placeholder="Searching...." className="w-75 form-control input_box  shadow-none rounded-0 "/>
                                    <button className="btn btn-success form-control px-3" onClick={()=>getweatherdata()}>Search</button>
                                </div>
                            </div>    
                        </div>
                    {data.length!=0?
                        <div>
                            <div className="text-center">
                                <p className="localTime">{localTimes}</p>
                                <div>
                                    <h3 className="mb-3">{data.name}, ({data.sys.country})</h3>
                                    <p className="cloudy">{data.weather[0].description}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="d-flex justify-content-around">
                                    <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} className="sunny_img" alt="wthr img" />
                                    <div>
                                        <h4 className="display-5 position-relative">{data.main.temp} c<span ><i class="position-absolute bi bi-circle h6"></i></span></h4>
                                    </div>
                                    <div>
                                        <div className="">
                                            <p><i class="bi bi-thermometer-half"></i> <span>Real fell {Math.floor(data.wind.deg)} T</span></p>
                                            <p><i class="bi bi-droplet-half"></i><span> Humidity {data.main.humidity} %</span></p>
                                            <p><i class="bi bi-wind"></i><span> Wind: {data.wind.speed}Km/h</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-center mt-3">
                                        <p>
                                            <i class="h5 bi bi-brightness-high"></i> <span>Rise : <b>{sunrise}</b> | </span>
                                            <i class="h5 bi bi-brightness-alt-high"></i><span> Set : <b>{sunset}</b> | </span>
                                        </p>
                                        <p>    
                                            <i class="bi bi-arrow-up-short"></i><span> High : <b>{data.main.temp_max}</b> | </span>
                                            <i class="bi bi-arrow-up-short"></i><span> Low : <b>{data.main.temp_min}</b> | </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-column mx-4 mb-5">
                                <h2>HOURLY FORECAST</h2><hr/>
                                <div className="d-flex justify-content-around mb-3">
                                    <p>02:00PM</p>
                                    <p>03:00PM</p>
                                    <p>04:00PM</p>
                                    <p>05:00PM</p>
                                    <p>06:00PM</p>
                                </div>
                                <div className="d-flex justify-content-around mb-4">
                                    <img src={sunny} className="cloud_img" alt=""/>
                                    <img src={sunny} className="cloud_img" alt=""/>
                                    <img src={sunny} className="cloud_img" alt=""/>
                                    <img src={sunny} className="cloud_img" alt=""/>
                                    <img src={sunny} className="cloud_img" alt=""/>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <h3 className="h5 position-relative">22<i class="position-absolute bi bi-circle temp "></i></h3>
                                    <h3 className="h5 position-relative">22<i class="position-absolute bi bi-circle temp "></i></h3>
                                    <h3 className="h5 position-relative">22<i class="position-absolute bi bi-circle temp "></i></h3>
                                    <h3 className="h5 position-relative">22<i class="position-absolute bi bi-circle temp "></i></h3>
                                    <h3 className="h5 position-relative">22<i class="position-absolute bi bi-circle temp "></i></h3>
                                </div>
                            </div>
                        </div>
                        :
                            <div>
                                <div className="not_found">
                                    <div className="text-center text-dark p-4">
                                        <h1 className="h2 ">Search Your Location </h1>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
export default Weather;