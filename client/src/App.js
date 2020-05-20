import React from 'react'
import './App.css'
import Grid from '@material-ui/core/Grid'
import { Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Dashboard from './pages/Dashboard'
import SubwayPage from './pages/SubwayPage'

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
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/subway" component={SubwayPage} />
      </Switch>
    </Grid>
  )
}

export default App
