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
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { TailSpin } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";

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
  const provider = new GoogleAuthProvider();
  let [passwordIconShow, SetPasswordIconShow] = useState(false);
  let [formData, setformData] = useState({
    email: "",
    password: "",
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
          navigate("/home");
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
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <Image className="registrationImg" imgSrc="../assets/loginImg.png" />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
