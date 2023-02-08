// import React, { useEffect } from "react";
// import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { activeUser } from "../slices/userSlice";
import Grid from "@mui/material/Grid";
import Block from "../components/Block";
import FriendRequest from "../components/FriendRequest";
import Friends from "../components/Friends";
import GroupList from "../components/GroupList";
import MyGroups from "../components/MyGroups";
import UserList from "../components/UserList";
const Home = () => {
  // const auth = getAuth();
  // let navigate = useNavigate();
  // let dispatch = useDispatch();
  // let data = useSelector(state=> state)

  // button ta rootlayout aniye nisi
  // useEffect(()=>{
  //   if(!data.userdata.userInfo){
  //     navigate("/login");
  //   }
  // },[])

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in
  //     dispatch(activeUser(user))
  //   } else {
  //     // User is signed out
  //     navigate("/login");
  //   }
  // });

  // let handleLogout = () => {

  //   signOut(auth).then(() => {
  //     localStorage.removeItem("userInfo")
  //     dispatch(activeUser(null))
  //     navigate("/login");
  //   });
  // };

  return (
    <>
      <Grid item xs={4}>
        <GroupList />
        <FriendRequest />
      </Grid>
      <Grid item xs={3}>
        <Friends />
        <MyGroups />
      </Grid>
      <Grid item xs={3}>
        <UserList />
        <Block />
      </Grid>
      {/* <button onClick={handleLogout}>Logout</button> */}
    </>
  );
};

export default Home;
