import React, { useState } from 'react'
import Header from '../components/Header'
import Heading from '../components/Heading'
import Image from '../components/Image';
import Grid from '@mui/material/Grid';
import InputBox from '../components/InputBox'
import PButton from '../components/PButton';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AuthenticationLink from '../components/AuthenticationLink';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'


const CommonButton = styled(Button)({
  width:"100%",
  backgroundColor: "#5F35F5",
  padding: '19px 12px',
  borderRadius: "8.71px",
  marginTop: "56px",
  fontFamily: ['Nunito', "sans-serif"],
  '&:hover': {
    backgroundColor: '#0069d9',
  },
});

const Login = () => {
    
  let [passwordIconShow, SetPasswordIconShow] = useState(false)
  return (
    <>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <div className='logLeftside'>
                  <div>
                      <Header>
                            <Heading className="regHeading" title="Login to your account!" as="h2"/>
                            
                            <Image className="loginWithGoogle" imgSrc="../assets/loginGoogle.png"/>

                      </Header>
                      <div className='inputBoxContainer'>
                          <InputBox className="regInputEmail" label="Email Address" variant="standard"/>
                          <div style={{width:"100%", position:"relative"}}>
                          <InputBox type={passwordIconShow?"text":"password"} className="regInputPassword" label="Password" variant="standard"/>
                          {passwordIconShow? 
                          <AiFillEye onClick={()=>SetPasswordIconShow(false)} className='eyeIcons' />
                          :
                          <AiFillEyeInvisible onClick={()=>SetPasswordIconShow(true)} className='eyeIcons'/>
                        }
                          </div>
                          <PButton bName={CommonButton} title='Login to Continue'/>
                          <AuthenticationLink className="regLink" title="Don’t have an account ? " href="/" hrefTitle="Sign Up"/>
                      </div>
                  </div>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
                <Image className="registrationImg" imgSrc="../assets/loginImg.png"/>
            </div>
          </Grid>
        </Grid>
    </>
  )
}

export default Login