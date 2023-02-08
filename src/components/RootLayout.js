import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Image from './Image';
import { useNavigate } from "react-router-dom";
import { activeUser } from "../slices/userSlice";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import PButton from './PButton';
import { useSelector, useDispatch } from "react-redux";
import {AiFillHome, AiFillMessage,AiFillSetting, AiOutlineLogout} from "react-icons/ai"
import {IoIosNotifications} from "react-icons/io"

const RootLayout = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let data = useSelector(state=> state)
    // console.log(data.userdata.userInfo.displayName)
    useEffect(()=>{
        if(!data.userdata.userInfo){
          navigate("/login");
        }
      },[])

    let handleLogout = () => {
   
        signOut(auth).then(() => {
          localStorage.removeItem("userInfo")
          dispatch(activeUser(null))
          navigate("/login");
        });
      };

  return (
    <>
        <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className='sidebarBox'>
          <div className='sidebar'>
            <div className="imageholder">
                <Image imgSrc="assets/profile.png" />
            </div>
                <h5>{data.userdata.userInfo.displayName}</h5>
            <div className='iconholder'>
            <AiFillHome className='icons'/>
            <AiFillMessage className='icons'/>
            <IoIosNotifications className='icons'/>
            <AiFillSetting className='icons'/>
            <button className='logoutbtn' onClick={handleLogout}><AiOutlineLogout className='icons'/></button>
            {/* <AiOutlineLogout className='icons'/> */}
             {/* <PButton click={handleLogout} title="Login to Continue" /> */}
            </div>
          </div>
          </div>
        </Grid>
        <Outlet/>
      </Grid>
    </>
  )
}

export default RootLayout