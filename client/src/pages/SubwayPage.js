import React from 'react'
import Subway from '../components/Subway'

const SubwayPage = () => {
  return (
    <>
      <Subway
        station="Graham Ave"
        direction="Manhattan Bound" />
      <Subway
        station="Graham Ave"
        direction="Canarsie Bound" />
    </>
  )
}

export default SubwayPage