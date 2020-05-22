import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { useInterval } from '../hooks/useInterval'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)
  const lat = 40.7143
  const lon = -74.006
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&
exclude=minutely&appid=${API_KEY}`

  useEffect(() => {
    renderWeather()
  }, [])
  useInterval(() => {
    renderWeather()
  }, 3600000)

  const renderTime = (unix, format) => {
    let timestamp = unix
    const day = new Date(timestamp * 1000)
      .toLocaleDateString()
      .substring(0, 4)
    const time = new Date(timestamp * 1000)
      .toLocaleTimeString()
    return format === 'time' ? time : day
  }

  const hourlyArgs = ['Hour', 'Temp', 'Feels Like', 'Weather']
  const sevenDayArgs = ['Day', 'Temp (Hi-Low)', 'Feels Like', 'Weather']
  const renderWeatherHeaders = (args) => {
    return args.map((arg, i) => {
      return (
        <Grid key={i} className="header" item xs={3}>
          <h5>{arg}</h5>
        </Grid>
      )
    })
  }

  const renderWeather = async () => {
    try {
      const response = await axios.get(weatherURL)
      console.log(response.data)
      setWeatherData(response.data)
    } catch (err) {
      console.log(err)
      setError(err.message)
    }
  }

  const renderHourly = (data) => {
    return data
      .filter((hour, i) => i < 7)
      .map(hour => {
      return (
        <Fragment key={hour.dt}>
          <Grid item xs={3}>
            {renderTime(hour.dt, 'time')}
          </Grid>
          <Grid item xs={3}>
            {Math.round(hour.temp)}&deg;
          </Grid>
          <Grid item xs={3}>
            {Math.round(hour.feels_like)}&deg;
          </Grid>
          <Grid item xs={3}>
            {hour.weather[0].main}
          </Grid>
        </Fragment>
      )
    })
  }

  const renderSevenDay = (data) => {
    return data
      .filter((day, i) => i < 7)
      .map(day => {
        return (
          <Fragment key={day.dt}>
            <Grid item xs={3}>
              {renderTime(day.dt, 'day')}
            </Grid>
            <Grid item xs={3}>
              {Math.round(day.temp.max)}&deg; | {' '}
              {Math.round(day.temp.min)}&deg;
            </Grid>
            <Grid item xs={3}>
              {Math.round(day.feels_like.night)}&deg; | {' '}
              {Math.round(day.feels_like.morn)}&deg;
            </Grid>
            <Grid item xs={3}>
              {
              day.weather[0].main === 'Rain' ||
              day.weather[0].main === 'Thunderstorm' ||
              day.weather[0].main === 'Snow' ? (
                <>
                  <strong>{day.weather[0].main}</strong>
                  {/* <img 
                    className="icon"
                    src=""
                    alt="icon" /> */}
                </>
              ) : day.weather[0].main
              }
            </Grid>
          </Fragment>
        )
      })
  }

  return (
    <Grid item xs={12}>
      <Paper>
        <h3>Weather</h3>
        {weatherData &&
          <p>
            Currently: 
            {Math.round(weatherData.current.temp)}&deg; <br />
            Feels like: 
            {Math.round(weatherData.current.feels_like)}&deg; <br />
            Weather: 
            {weatherData.current.weather[0].main}
          </p>
        }
        <Grid container>
          <Grid item xs={12} sm={6} className="hourly">
            <h3>Hourly</h3>
            <Grid container>
              {renderWeatherHeaders(hourlyArgs)}
            </Grid>
            <Grid container spacing={2}>
              {weatherData && renderHourly(weatherData.hourly)}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} className="sevenDay">
            <h3>7 Day</h3>
            <Grid container>
              {renderWeatherHeaders(sevenDayArgs)}
            </Grid>
            <Grid container spacing={2}>
              {weatherData && renderSevenDay(weatherData.daily)}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Weather