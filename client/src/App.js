import React from 'react'
import './App.css'
import Subway from './components/Subway'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    padding: '15px',
    margin: '0 auto',
    textAlign: 'center'
  },
})

function App() {
  return (
    <Grid 
      className="App" 
      container 
      spacing={2}>
      <Subway
        station="Graham Ave"
        direction="Manhattan Bound" />
    </Grid>
  )
}

export default App
