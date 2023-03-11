import React, { useEffect, useState } from "react";
import Image from "./Image";
import { getDatabase, ref, onValue, set, push , remove} from "firebase/database";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";

// import PButton from "./PButton";
// import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";

// const CommonButton = styled(Button)({
//     width: "100%",
//     backgroundColor: "#5F35F5",
//     padding: "19px 12px",
//     borderRadius: "86px",
//     marginTop: "56px",
//     // pointerEvents: "none",
//     fontFamily: ["Nunito", "sans-serif"],
//     "&:hover": {
//       backgroundColor: "#0069d9",
//     },
//   });
const UserList = () => {
  const db = getDatabase();
  let auth = getAuth();
  const data = useSelector((state) => state);
  let [userlist, setUserlist] = useState([]);
  let [friendRequest, setFriendRequest] = useState([]);
  let [friends, setFriends] = useState([]);
  // let [unfriend, setUnfriend] = useState([]);

  useEffect(() => {
    const userRef = ref(db, "users");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.userdata.userInfo.uid != item.key) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUserlist(arr);
    });
  }, []);

  useEffect(() => {
    const userRef = ref(db, "friends");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
          arr.push(item.val().receiverId + item.val().senderId);
      });
      setFriends(arr);
    });
  }, []);

  useEffect(() => {
    const userRef = ref(db, "friendRequest");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().receiverId + item.val().senderId);
      });
      setFriendRequest(arr);
    });
  }, []);

  let handleFriendRequest = (info) => {
    // info hocce jake click kora hocce tar information
    set(push(ref(db, "friendRequest")), {
      senderName: data.userdata.userInfo.displayName,
      senderId: data.userdata.userInfo.uid,
      receiverName: info.displayName,
      receiverId: info.id,
    });
  };
  // pending a kaj kortesena tai comment kore rakhlam
  // let handleCancelRequest=(item)=>{
  //   remove(ref(db, "friendRequest/"+item.id)).then(()=>{
  //     console.log("Cancel Request")
  //   })
  // }

  // unfriend a kaj kortesena tai comment kore rakhlam
  // let handleUnfriend=(item)=>{
  //   remove(ref(db, "friends/"+item.id)).then(()=>{
  //     console.log("unfriend")
  // }) 
  // }
  return (
    <div className="groupholder">
      <div className="titleholder">
        <h3>User List</h3>
      </div>
      <div className="boxholder">
        {userlist.map((item) => (
          <div className="box">
            <div className="boxImgholder">
              <Image imgSrc="assets/profile.png" />
            </div>
            <div className="title">
              <h3>{item.displayName}</h3>
              <p>{item.email}</p>
            </div>
            <div>
              {
                friends.includes(item.id + data.userdata.userInfo.uid) || friends.includes(data.userdata.userInfo.uid + item.id) ?
                <button className="boxbtn">
                  Friend
                </button>
                // <button onClick={()=>handleUnfriend(item)} className="boxbtn">
                //   Friend
                // </button>
                :
              friendRequest.includes(item.id + data.userdata.userInfo.uid) || friendRequest.includes(data.userdata.userInfo.uid + item.id) ? (
                <button className="boxbtn">
                  Pending
                </button>
              //   <button onClick={()=>handleCancelRequest(item)} className="boxbtn">
              //   Pending
              // </button>
              ) : (
                <button onClick={() => handleFriendRequest(item)} className="boxbtn">
                  Add
                </button>
              )}

              {/* <PButton className='boxbtn' click={handleFriendRequest} bName={CommonButton} title="Sign up" /> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
