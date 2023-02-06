import React, { useEffect } from "react";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { activeUser } from "../slices/userSlice";
const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let data = useSelector(state=> state)
  // console.log(data.userdata.userInfo.uid)
  useEffect(()=>{
    if(!data.userdata.userInfo){
      navigate("/login");
    }
  },[])
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in
  //     dispatch(activeUser(user))
  //   } else {
  //     // User is signed out
  //     navigate("/login");
  //   }
  // });

  let handleLogout = () => {
   
    signOut(auth).then(() => {
      localStorage.removeItem("userInfo")
      dispatch(activeUser(null))
      navigate("/login");
    });
  };

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Home;
