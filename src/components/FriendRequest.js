import React, { useEffect, useState } from "react";
import Image from "./Image";
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import Alert from '@mui/material/Alert';
// import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FriendRequest = () => {
//   let auth = getAuth();
  const db = getDatabase();
  let [fRequest, setFRequest] = useState([]);

//   akhon j login ase
  let data = useSelector((state) => state);
//    j login ase tar id = data.userdata.userInfo.uid

  useEffect(() => {
    const starCountRef = ref(db, "friendRequest");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach(item => {
        console.log(item)
        if(item.val().receiverId == data.userdata.userInfo.uid){
              arr.push({...item.val(), id:item.key});
        }
      });
      setFRequest(arr);
    });
  }, []);

  let handleReject=(item)=>{
    remove(ref(db, "friendRequest/"+item.id)).then(()=>{
        toast("Reject your friend");
    })
  }
  let handleAccept=(item)=>{
    set(push(ref(db, 'friends')), {
        ...item,
        date: `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
      }).then(()=>{
        remove(ref(db, "friendRequest/"+item.id)).then(()=>{
            toast("Accept your friend");
        })
      });
  }
  return (
    
    <div className="groupholder">
        <ToastContainer
            position="bottom-center"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
      <div className="titleholder">
        <h3>Friend Request</h3>
      </div>
      <div className="boxholder">
      {
        fRequest.length > 0?
        fRequest.map((item) => (
            <div className='box'>
              <div className='boxImgholder'>
                  <Image imgSrc="assets/profile.png"/>
              </div>
              <div className='title'>
                  <h3>{item.senderName}</h3>
                  <p>Hi Guys, Wassup!</p>
              </div>
              <div>
                  <button onClick={()=>handleAccept(item)} className='boxbtn'>Accept</button>
                  <button onClick={()=>handleReject(item)} className='boxbtn'>Rejcect</button>
              </div>
          </div>
        ))
        :
        <Alert style={{ marginTop: "20px" }} variant="filled" severity="info">
              No Friend Request
            </Alert>
    }
      </div>
    </div>
  );
};

export default FriendRequest;
