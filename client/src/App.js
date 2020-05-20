import React from 'react'
import './App.css'
import Subway from './components/Subway'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    padding: '0 15px',
    width: '100%',
    margin: '0 auto',
    textAlign: 'center'
  },
})

function App() {
  const classes = useStyles()
  return (
    <Grid 
      className={`${classes.root} App`} 
      container 
      spacing={2}>
      <Subway
        station="Graham Ave"
        direction="Manhattan Bound" />
      <Subway
        station="Graham Ave"
        direction="Canarsie Bound" />
    </Grid>
  )
}

export default App
