import React from 'react'
import Grid from '@mui/material/Grid';

const NotificationPage = () => {
  return (
    <>
        <Grid item xs={4}>
          <h1>NotificationPage</h1>
        </Grid>
        <Grid item xs={3}>
          <h1>xs=4</h1>
        </Grid>
        <Grid item xs={3}>
          <h1>xs=8</h1>
        </Grid>
    </>
  )
}

export default NotificationPage