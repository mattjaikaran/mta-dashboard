import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { useInterval } from '../hooks/useInterval'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'



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
  // useInterval(() => {
  //   renderWeather()
  // }, 3600000)

  const renderTime = (unix, format) => {
    let timestamp = unix
    const day = new Date(timestamp * 1000).toLocaleDateString()
    const time = new Date(timestamp * 1000).toLocaleTimeString()
    return format === 'time' ? time : day
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
            {hour.temp}
          </Grid>
          <Grid item xs={3}>
            {hour.feels_like}
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
              {day.temp.min} | {' '}
              {day.temp.max}
            </Grid>
            <Grid item xs={3}>
              {day.feels_like.morn} | {' '}
              {day.feels_like.night}
            </Grid>
            <Grid item xs={3}>
              {day.weather[0].main}
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
            Currently: {weatherData.current.temp} <br />
            Feels like: {weatherData.current.feels_like} <br />
            Weather: {weatherData.current.weather[0].main}
          </p>
        }
        <Grid container>
          <Grid item xs={12} sm={6} className="hourly">
            <h3>Hourly</h3>
            <Grid container spacing={2}>
              {weatherData && renderHourly(weatherData.hourly)}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} className="sevenDay">
            <h3>7 Day</h3>
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