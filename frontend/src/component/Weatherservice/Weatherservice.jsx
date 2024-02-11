import React from "react";
const Weatherservice=(city)=>{
    console.log(city);
    const getweatherdata=async()=>{
        const api_key="21d275e5e9900cde795ae57c96128a1d";
        const api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
        const url= await fetch(api).then((res)=> res.json()).then((data)=>data);
        return url;
    }
    return (
        <>
            {/* getweatherdata(); */}
        </>
    )
}
export default Weatherservice;