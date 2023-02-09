import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Image from './Image';
import { useNavigate } from "react-router-dom";
import { activeUser } from "../slices/userSlice";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
// import PButton from './PButton';
import PButton from "../components/PButton";
import { useSelector, useDispatch } from "react-redux";
import {AiFillHome, AiFillMessage,AiFillSetting, AiOutlineLogout} from "react-icons/ai"
import {IoIosNotifications} from "react-icons/io"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from "@mui/material/styles";
import { getStorage, ref, uploadString } from "firebase/storage";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
// for button
  const CommonButton = styled(Button)({
    width: "100%",
    backgroundColor: "#5F35F5",
    padding: "19px 12px",
    borderRadius: "86px",
    marginTop: "56px",
    fontFamily: ["Nunito", "sans-serif"],
    "&:hover": {
      backgroundColor: "#0069d9",
    },
  });
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
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

        const [image, setImage] = useState();
        const [cropData, setCropData] = useState("#");
        const [cropper, setCropper] = useState();
        const onChange = (e) => {
            e.preventDefault();
            let files;
            if (e.dataTransfer) {
              files = e.dataTransfer.files;
            } else if (e.target) {
              files = e.target.files;
            }
            const reader = new FileReader();
            reader.onload = () => {
              setImage(reader.result);
            };
            reader.readAsDataURL(files[0]);
          };
          const getCropData = () => {
            if (typeof cropper !== "undefined") {
              setCropData(cropper.getCroppedCanvas().toDataURL());
              const storage = getStorage();
              const storageRef = ref(storage, `profilePic/${data.userdata.userInfo.uid}`);
              // Data URL string
              const message4 = cropper.getCroppedCanvas().toDataURL();
              uploadString(storageRef, message4, 'data_url').then((snapshot) => {
              console.log('Uploaded a data_url string!');
              });
            }
          };

  return (
    <>
        <Grid container spacing={2}>
        <Grid item xs={1}>
          <div className='sidebarBox'>
          <div className='sidebar'>
            <div className="imageholder">
                <Image handleImage={handleOpen} imgSrc="assets/profile.png" />
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
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Upload your Profile
                        <div className="imageholder">
                            {
                                image ?
                                <div className="img-preview"></div>
                                :
                                    data.userdata.userInfo.photoURL ?
                                    <Image imgSrc="data.userdata.userInfo.photoURL"/>
                                    :
                                    <Image imgSrc="assets/profile.png" />
                            }
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {/* <input type='file' /> */}
                        <Stack direction="row" alignItems="center" spacing={2}>
                        <Button variant="contained" component="label">
                            Upload
                            <input onChange={onChange} hidden accept="image/*" multiple type="file" />
                        </Button>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            <input onChange={onChange} hidden accept="image/*" type="file" />
                            <PhotoCamera />
                        </IconButton>
                        </Stack>
                        {image && (
                        <>
                            <Cropper
                            style={{ height: 400, width: "100%" }}
                            zoomTo={0.5}
                            initialAspectRatio={1}
                            preview=".img-preview"
                            src={image}
                            viewMode={1}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                            onInitialized={(instance) => {
                                setCropper(instance);
                            }}
                            guides={true}
                            />
                           <PButton click={getCropData} bName={CommonButton} title="Upload" />
                        </>
                        )}
                    </Typography>
                
                    </Box>
                </Modal>
        </Grid>
        <Outlet/>
      </Grid>
    </>
  )
}

export default RootLayout