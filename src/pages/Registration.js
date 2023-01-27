import React from 'react'
import Header from '../components/Header'
import Heading from '../components/Heading'
import Image from '../components/Image';
import Grid from '@mui/material/Grid';
import InputBox from '../components/InputBox'
import PButton from '../components/PButton';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AuthenticationLink from '../components/AuthenticationLink';


const CommonButton = styled(Button)({
  width:"100%",
  backgroundColor: "#5F35F5",
  padding: '19px 12px',
  borderRadius: "86px",
  marginTop: "56px",
  fontFamily: ['Nunito', "sans-serif"],
  '&:hover': {
    backgroundColor: '#0069d9',
  },
});

const Registration = () => {
  return (
    <>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className='regLeftside'>
                  <div>
                      <Header>
                            <Heading className="regHeading" title="Get started with easily register" as="h2"/>
                            <p className='regSubheading'>Free register and you can enjoy it</p>
                      </Header>
                      <div className='inputBoxContainer'>
                          <InputBox className="regInputEmail" label="Email Address" variant="outlined"/>
                          <InputBox className="regInputfullName" label="Full name" variant="outlined"/>
                          <InputBox className="regInputPassword" label="Password" variant="outlined"/>
                          <PButton bName={CommonButton} title='Sign up'/>
                          <AuthenticationLink className="regLink" title="Already  have an account ?" href="/login/" hrefTitle="Sign In"/>
                      </div>
                  </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
                <Image className="registrationImg" imgSrc="assets/regiImg.png"/>
            </div>
          </Grid>
        </Grid>
    </>
  )
}

export default Registration