import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Alert from '@material-ui/lab/Alert'
import { useInterval } from '../hooks/useInterval'
import Delay from './Delay'
const LTrainImg = require('../assets/L.svg')

const useStyles = makeStyles({
  root: {
    marginTop: '1em',
    textAlign: 'center',
    backgroundColor: '#218c74',
    color: 'white'
  },
  titleWrapper: {
    // backgroundColor: '#218c74',
    paddingTop: '0.75em',
    paddingBottom: '1em',
    fontWeight: 300,
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  },
  trainImg: {
    maxWidth: '40px',
    margin: '1em 0'
  },
  list: {
    display: 'inline'
  },
  loading: {
    margin: '1em 0',
  },
  trainTime: {
    listStyleType: 'none',
    '&:last-child': {
      border: 'none'
    }
  },
  text: {
    marginTop: '1em',
    fontSize: '22px'
  },
  errorMessage: {
    textAlign: 'center',
    borderTop: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
  }
})

const staticData = {
  data: {
    stations: {
      L11N: {
        name: "Graham Av",
        trains: [
          { trainId: "L", eta: "10:36 pm", minAway: "6m, 52s" },
          { trainId: "L", eta: "10:48 pm", minAway: "19m, 43s" },
          { trainId: "L", eta: "10:57 pm", minAway: "27m, 47s" },
          { trainId: "L", eta: "11:06 pm", minAway: "36m, 47s" },
          { trainId: "L", eta: "11:18 pm", minAway: "48m, 47s" },
        ]
      }
    }
  }
}

const Subway = (props) => {
  const [subwayData, setSubwayData] = useState(null)
  const [error, setError] = useState(false)
  const [delay, setDelay] = useState(false)
  const { station, direction } = props
  const classes = useStyles()

  const getData = async () => {
    setError(false)
    try {
      // using static data to not kill API requests
      // const response = await axios.get('http://localhost:4000')
      const response = staticData
      console.log(response.data)
      setSubwayData(response.data.stations.L11N.trains)
      console.log(subwayData)
    } catch (err) {
      console.log(err)
      return setError(true)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useInterval(() => {
    getData()
  }, 60000)

  return (
    <Grid item xs={12} sm={6}>
      <Paper className={classes.root}>
        <div className={classes.titleWrapper}>
          <h2 className={classes.title}>{station} - {direction}</h2>
        </div>
        <div className={classes.imgWrapper}>
          
        </div>
        <ul className={classes.list}>
          {subwayData ? subwayData.map((train, i) => {
            console.log(train)
            const { eta, minAway } = train
            return (
              <>
                <li className={classes.trainTime}>
                  <Grid container>
                    <Grid item xs={4}>
                      <img
                        className={classes.trainImg}
                        src={LTrainImg} />
                    </Grid>
                    <Grid className={classes.text} item xs={4}>
                      {eta}
                    </Grid>
                    <Grid className={classes.text} item xs={4}>
                      {minAway}
                    </Grid>
                  </Grid>
                </li>
                <Divider />
              </>
            )
          }) : (
            <div className={classes.loading}>Loading...</div>
          )}
          {error && (
            <Alert className={classes.errorMessage} severity="error">
              API Error. Something went wrong.
            </Alert>
          )}
        </ul>
        {!delay ? (
          <Delay message={`Sick Passenger at Bedford Ave. Expect delays.`} /> 
        ) : null} 
      </Paper>
    </Grid>
  )
}

export default Subway 