import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Heading from '../components/Heading'
import Image from '../components/Image';
import Grid from '@mui/material/Grid';
import InputBox from '../components/InputBox'
import PButton from '../components/PButton';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AuthenticationLink from '../components/AuthenticationLink';
import Alert from '@mui/material/Alert';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
  const auth = getAuth();

  let [formData, setformData] = useState({
    email:"",
    fullname:"",
    password:"",
  })

  let [formError, setFormError] = useState({})
  let [isSubmit, setIsSubmit]= useState(false)
  let [passwordIconShow, SetPasswordIconShow] = useState(false)
  let [successfullShow, setSuccessfullShow] = useState(false)
  let handleTextChange= (e)=>{
    //longWay:
    // if(e.target.name=="email"){
    //   setformData({...formData, email:e.target.value})
    //   console.log(formData)
    // }else if(e.target.name =="fullname"){
    //   setformData({...formData, fullname:e.target.value})
    //   console.log(formData)
    // }else{
    //   setformData({...formData, password:e.target.value})
    //   console.log(formData)
    // }

    //shortWay:
    let {name, value} = e.target
    setformData({...formData, [name]:value})
  }

  let handleClick= (e)=>{
    setFormError(validate(formData))
      // setIsSubmit(true)

    // if(!formData.email){
    //   setFormError({...formError, emailError:true})
    // }
    // if(!formData.fullname){
    //   setFormError({...formError, fullnameError:true})
    // }
    // if(!formData.password){
    //   setFormError({...formError, passwordError:true})
    // }
  }

  // useEffect(()=>{
  //   console.log(formData)
  //   if(Object.keys(err).length == 0 && isSubmit){
  //     console.log(formData)
  //   }
  // }, [err])

  let validate=(values)=>{
    let errors ={}
    let regex= /^[^\s@]+@[^\s@]+[^\s@]{2,}$/i
    if(!values.email){
      errors.isEmailTrue =true
      errors.email="Email is required"
      
    }else if(!regex.test(values.email)){
      errors.isEmailTrue =true
      errors.email="This is not a valid email format"
    }
    if(!values.fullname){
      errors.isFullnameTrue =true
      errors.fullname="Fullname is required"
    }
    if(!values.password){
      errors.isPasswordTrue =true
      errors.password="Password is required"
    }else if(values.password.length < 6){
      errors.isPasswordTrue =true
      errors.password="Password must be more than or equal to 6"
    }else if(values.password.length > 12){
      errors.isPasswordTrue =true
      errors.password="Password must be less than or equal to 12"
    }
    else{
      createUserWithEmailAndPassword(auth, values.email, values.password).then((users)=>{
        // console.log(users)
        setformData({...formData, email:"", fullname:"", password:""})
        setSuccessfullShow(true)
        console.log("successfully registerd")
      }).catch((error)=>{
        const errorCode = error.code;
        if(errorCode.includes('auth/email-already-in-use')){
          errors.email="Email Already Exist"
          errors.isEmailTrue =true
          console.log(errors.email)
        }
      })
    }
    return errors;
  }

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
                        {successfullShow && 
                      <Alert style={{width:"22%", position:"absolute"}} variant="filled" severity="success">successfully Login</Alert>}
                          <InputBox type="email" name="email" value={formData.email} className="regInputEmail" textChange={handleTextChange} label="Email Address" variant="outlined"/>
                          {formError.isEmailTrue && 
                              <Alert className='error' variant="filled" severity="error">{formError.email}</Alert>
                          }

                          <InputBox type="text" name="fullname" value={formData.fullname} className="regInputfullName" textChange={handleTextChange} label="Full name" variant="outlined"/>
                          {formError.isFullnameTrue && 
                              <Alert className='error' variant="filled" severity="error">{formError.fullname}</Alert>
                          }
                          
                          <div style={{width:"100%", position:"relative"}}>
                          <InputBox type={passwordIconShow? "text": "password"} name="password" value={formData.password} className="regInputPassword" textChange={handleTextChange} label="Password" variant="outlined"/> 
                          {passwordIconShow? 
                          <AiFillEye onClick={()=>SetPasswordIconShow(false)} className='eyeIcons' />
                          :
                          <AiFillEyeInvisible onClick={()=>SetPasswordIconShow(true)} className='eyeIcons'/>
                        }
                          </div>
                          {formError.isPasswordTrue && 
                              <Alert className='error' variant="filled" severity="error">{formError.password}</Alert>
                          }

                          <PButton click={handleClick} bName={CommonButton} title='Sign up'/>
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