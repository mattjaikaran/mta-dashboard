import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { useInterval } from '../hooks/useInterval'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import cloudy from '../assets/cloudy.svg'
import moon from '../assets/moon.svg'
import snow from '../assets/snow.svg'
import thunderstorm from '../assets/thunderstorm.svg'
import sunny from '../assets/sunny.svg'

const useStyles = makeStyles({
  root: {
    padding: '20px',
  },
  title: {
    paddingTop: '1em'
  },
  weatherIcon: {
    maxWidth: '50px',
    marginTop: '1em'
  },
})

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)
  const [currentWeatherIconImg, setCurrentWeatherIconImg] = useState(null)
  const classes = useStyles()
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
  const renderWeatherHeaders = (args) => {
    return args.map((arg, i) => {
      return (
        <Grid key={i} className="header" item xs={3}>
          <h5>{arg}</h5>
        </Grid>
      )
    })
  }

  const renderWeatherImg = (weather) => {
    if (weather === 'Clouds' || weather === 'Cloudy') {
      setCurrentWeatherIconImg(cloudy)
    }
    if (weather === 'Snow' || weather === 'Snow Showers') {
      setCurrentWeatherIconImg(snow)
    }
    if (weather === 'Clear' || weather === 'Sunny') {
      setCurrentWeatherIconImg(sunny)
    }
    if (weather === 'Rain' || 
    weather === 'Thunderstorms' ||
    weather === 'Showers') {
      setCurrentWeatherIconImg(thunderstorm)
    }
    console.log(weather)
  }

  const renderWeather = async () => {
    try {
      const response = await axios.get(weatherURL)
      console.log(response.data)
      setWeatherData(response.data)
      renderWeatherImg(response.data.current.weather[0].main)
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

  return (
    <Grid 
      item 
      className={classes.root}
      sm={12} 
      md={6}>
      <Paper>
        <h2 className={classes.title}>Weather</h2>
        <Grid container spacing={2}>
          {weatherData &&
            <>
              <Grid item xs={6}>
                Currently:
                <h3>
                  {Math.round(weatherData.current.temp)}&deg;
                </h3> 
                Feels Like: {' '}
                <h3>
                  {Math.round(weatherData.current.feels_like)}&deg;
                </h3>
              </Grid>
              <Grid item xs={6}>
                Weather:
                <h3>{weatherData.current.weather[0].main}</h3>
                <img
                  src={currentWeatherIconImg}
                  className={classes.weatherIcon}
                  alt="weather-icon" />
              </Grid>
            </>
          }
        </Grid>
        <h3>Hourly</h3>
        <Grid container>
          {renderWeatherHeaders(hourlyArgs)}
        </Grid>
        <Grid container spacing={2}>
          {weatherData && renderHourly(weatherData.hourly)}
        </Grid>
      </Paper>
    </Grid>
  )
}

export default Weather