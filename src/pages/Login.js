import React, { useState } from "react";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Image from "../components/Image";
import Grid from "@mui/material/Grid";
import InputBox from "../components/InputBox";
import PButton from "../components/PButton";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AuthenticationLink from "../components/AuthenticationLink";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { TailSpin } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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


const CommonButton = styled(Button)({
  width: "100%",
  backgroundColor: "#5F35F5",
  padding: "19px 12px",
  borderRadius: "8.71px",
  marginTop: "56px",
  fontFamily: ["Nunito", "sans-serif"],
  "&:hover": {
    backgroundColor: "#0069d9",
  },
});

const Login = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const provider = new GoogleAuthProvider();
  let [passwordIconShow, SetPasswordIconShow] = useState(false);
  let [formData, setformData] = useState({
    email: "",
    password: "",
    fgp: "",
  });
  let handleTextChange = (e) => {
    let { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };
  let handleClick = (e) => {
    // setFormError(validate(formData));
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        // login na korle home a jete parbena
        dispatch(activeUser(userCredential.user))
        localStorage.setItem("userInfo", JSON.stringify(userCredential.user))
        if(userCredential.user.emailVerified){
          navigate("/pechal");
        }
        else{
          toast("Please varified your email and then try again later!");
        }
      })
      // .catch((error) => {
      //   // const errorCode = error.code;
      //   // console.log("catch: ", errorCode);
      //   // setformData({...formData, password:""})
      //   toast("Please varified your email and then try again later!");
      // });
  };
  let handleFgp=()=>{
    const auth = getAuth();
    sendPasswordResetEmail(auth, formData.fgp)
   .then(() => {
    console.log("Password reset email sent!")
    })
  }

  let handleGoogle= ()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
   navigate("/home")
    // console.log("kaj hoyce")
  })
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <div className="logLeftside">
            <div>
              <Header>
                    <Heading className="regHeading" title="Login to your account!" as="h2" />
                    <Image handleGoogleAcc={handleGoogle} className="loginWithGoogle" imgSrc="../assets/loginGoogle.png" />
              </Header>
              <div className="inputBoxContainer">
                <InputBox name="email" textChange={handleTextChange} className="regInputEmail" label="Email Address" variant="standard" />
                <div style={{ width: "100%", position: "relative" }}>
                  <InputBox
                    name="password"
                    textChange={handleTextChange}
                    type={passwordIconShow ? "text" : "password"}
                    className="regInputPassword"
                    label="Password"
                    variant="standard"
                  />
                  {passwordIconShow ? (
                    <AiFillEye onClick={() => SetPasswordIconShow(false)} className="eyeIcons" />
                  ) : (
                    <AiFillEyeInvisible onClick={() => SetPasswordIconShow(true)} className="eyeIcons" />
                  )}
                </div>
                <PButton click={handleClick} bName={CommonButton} title="Login to Continue" />
                <AuthenticationLink className="regLink" title="Don’t have an account ? " href="/" hrefTitle="Sign Up" />
                {/* <AuthenticationLink className="regLink" title="forgot password ? " href="/fgp" hrefTitle="click here" /> */}
                <Button onClick={handleOpen}>Forgot password</Button>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <Image className="registrationImg" imgSrc="../assets/loginImg.png" />
          </div>
        </Grid>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Forgot Password
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <InputBox name="fgp" textChange={handleTextChange} className="regInputEmail" label="Email" variant="standard" />
          <PButton click={handleFgp} bName={CommonButton} title="Send" />

          </Typography>
        </Box>
      </Modal>
      </Grid>
    </>
  );
};

export default Login;
