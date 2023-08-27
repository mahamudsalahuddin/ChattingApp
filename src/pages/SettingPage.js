import React from 'react'
import Grid from '@mui/material/Grid';

const SettingPage = () => {
  return (
    <>
        <Grid item xs={4}>
          <h1>Settings</h1>
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

export default SettingPage