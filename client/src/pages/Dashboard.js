import React from 'react'
import Subway from '../components/Subway'
import Weather from '../components/Weather'

const Dashboard = () => {
  return (
    <>
      <Subway
        station="Graham Ave"
        direction="Manhattan Bound" />
      <Weather />
    </>
  )
}

export default Dashboard