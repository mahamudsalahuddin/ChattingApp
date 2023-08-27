import React from 'react'
import Grid from '@mui/material/Grid';
import MessageFriend from "../components/MessageFriend";
import Friends from "../components/Friends";
import JoinGroupList from '../components/JoinGroupList';
import MessageBox from '../components/MessageBox';

const Message = () => {
  return (
    <>
        <Grid item xs={4}>
          {/* <h1>Message</h1> */}
          <JoinGroupList/>
          <MessageFriend/>
        </Grid>
        <Grid item xs={6}>
          <MessageBox/>
        </Grid>
    </>
  )
}

export default Message