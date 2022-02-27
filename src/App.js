import React, { useState, useEffect, useReducer } from 'react'
import reducer from './reducer'
import Weather from './Weather'
import './styles/index.css'

export const WeatherInfoContext = React.createContext()

const MY_KEY = process.env.REACT_APP_MY_API_KEY
function App() {
  const getLocation = async (e) => {
    e.preventDefault()
    const resp = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${MY_KEY}`)
    const locCity = await resp.json()
    dispatch({ type: 'CITY', payload: { city: locCity[0].name } })
    dispatch({ type: 'SET_CORDS', payload: { lat: locCity[0].lat, lon: locCity[0].lon } })
  }

  const displayInfo = async () => {
    const resp = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${state.lat}&lon=${state.lon}&units=metric&appid=${MY_KEY}`)
    const respJson = await resp.json()
    dispatch({ type: 'SET_INFO', payload: { data: respJson } })
    const respPollution = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${state.lat}&lon=${state.lon}&appid=${MY_KEY}`)
    const respPollutionJson = await respPollution.json()
    dispatch({ type: 'GET_POLLUTION', payload: { pollution: respPollutionJson } })
  }

  const info = {
    loading: true,
    city: '',
    data: {},
    data_pollution: {},
    lon: '',
    lat: '',
  }

  const [city, setCity] = useState('');

  const [state, dispatch] = useReducer(reducer, info, () => {
    const localData = localStorage.getItem('city');
    return localData ? JSON.parse(localData) : [];
  })

  useEffect(() => {
    state.lat && state.lon && displayInfo()
    state.data && localStorage.setItem('city', JSON.stringify(state))
  }, [state.lat && state.lon])

  return (
    <>
      <WeatherInfoContext.Provider value={{ ...state }}>
        <div className='flex flex-col justify-center items-center focus:outline-none'>
          <header>
            <form onSubmit={getLocation}>
              <input
                className="active:outline-dotted border-transparent active:border-transparent active:ring-0"
                type="text"
                placeholder='Enter your location'
                onChange={(e) => setCity(e.target.value)}
                value={city}
                name='city' id='city' required className="md:mt-16 md:rounded-tl-md md:p-2 p-2 pb-3 mt-0 shadow-md text-center placeholder-slate-800 border-solid border-slate-50 rounded-bl-md p-1" />
              <button type="submit" className='md:rounded-tr-md md:p-2 bg-slate-800 p-2 pb-3 text-slate-50 border-solid border-slate-50 rounded-br-md p-1'>
                Search
              </button>
            </form>
          </header>
          <Weather />
        </div>
      </WeatherInfoContext.Provider>
    </>
  );
}

export default App;
