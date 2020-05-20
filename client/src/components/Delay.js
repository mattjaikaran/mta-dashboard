import React from 'react'
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  errorMessage: {
    '&:last-child': {
      border: '0 !important'
    }
  }
})

const Delay = (props) => {
  const classes = useStyles()
  return (
    <Alert className={classes.errorMessage} severity="error">
      {props.message || 'There is a delay.'}
    </Alert>
  )
}

export default Delay