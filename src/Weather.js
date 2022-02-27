import React, { useContext } from 'react'
import { WeatherInfoContext } from './App';

function Weather() {
    return (
        <div>
            <BasicInfo />
        </div>
    )
}

const BasicInfo = () => {
    const { data, city } = useContext(WeatherInfoContext)
    const currentDate = new Date();
    const weekday = ["Sun.", "Mon,", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."];
    if (Object.keys(data).length !== 0) {
        return (
            <section className="flex flex-col mt-16 bg-slate-400 p-3 border-solid rounded-xl">
                <article className="flex flex-col bg-slate-400 mb-5">
                    <div className='flex self-center text-3xl font-bold mb-3 text-slate-200'>
                        <h1>{city}</h1>
                    </div>
                    <div className='flex flex-row flex-nowrap space-x-8 text-xl'>
                        <div className='mb-2 basis-1/3'>
                            <p className='decoration-white'>{`${weekday[currentDate.getDay()]} ${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`}</p>
                            <p>{`${currentDate.getHours()}:`}{(currentDate.getMinutes() < 10) ? `0${currentDate.getMinutes()}` : currentDate.getMinutes()}</p>
                        </div>
                        <div className='basis-1/3'>
                            <p className='text-5xl'>{parseInt(data.main.temp)}°C</p>
                        </div>
                        <div className='basis-1/3'>
                            <img className="weatherPic" src={`./pictures/${data.weather[0].icon}@2x.png`} alt="Couldn't load" />
                        </div>
                    </div>
                    <div className='flex flex-row mt-4'>
                        <div>
                            <div className='text-xl'><img src="./pictures/wind.svg" alt="" className="windSvg" />{parseInt(data.wind.speed)} km/h</div>
                        </div>
                        <div className="ml-auto mt-auto text-xl">
                            <p>Max: {parseInt(data.main.temp_max)}°C</p>
                            <p>Min: {parseInt(data.main.temp_min)}°C</p>
                        </div>
                    </div>
                </article>
                <AirQuality />
            </section>
        );
    } else {
        return (<></>);
    }
}

const AirQuality = () => {
    const { data_pollution } = useContext(WeatherInfoContext)
    if (Object.keys(data_pollution).length !== 0) {
        const airQuality = data_pollution.list[0].main.aqi
        const airQualityUnits = ['Good', 'Fair', 'Moderate', 'Poor', 'Very poor']
        const currentQuality = airQualityUnits[airQuality]

        return (
            <article className={`flex flex-col place-items-center text-2xl ${currentQuality} p-2 border-solid rounded-xl`}>
                <p className='self-center'>Pollution: </p>
                <p className='font-bold text-7xl'>{currentQuality}</p>
            </article>
        );
    } else {
        return (<></>)
    }
}

export default Weather