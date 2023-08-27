import React, { useEffect, useState } from "react";
import Image from "./Image";
import InputBox from "./InputBox";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import moment from "moment/moment";
import ScrollToBottom from 'react-scroll-to-bottom';
import Alert from "@mui/material/Alert";

const MessageBox = () => {
  let data = useSelector((state) => state);
  let [msg, setMsg] = useState("");
  let [msgList, setMsgList] = useState([]);
  const db = getDatabase();
  // console.log(data.activeUser.activeChatUser==null)
  // console.log(data.userdata.userInfo.receiverId)


  let handleChangeMsg = (e) => {
    set(push(ref(db, "singleMessage")), {
      msg: msg,
      whoSendId: data.userdata.userInfo.uid,
      whoSendName: data.userdata.userInfo.displayName,
      whoReceivedId:
        data.activeUser.activeChatUser.senderId == data.userdata.userInfo.uid
          ? data.activeUser.activeChatUser.receiverId
          : data.activeUser.activeChatUser.senderId,
        whoReceivedName: data.activeUser.activeChatUser.senderId == data.userdata.userInfo.uid
        ? data.activeUser.activeChatUser.receiverName
        : data.activeUser.activeChatUser.senderName,
      date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
    }).then(()=>{
      setMsg("")
    });
    
  };

  useEffect(()=>{
    
    const userRef = ref(db, "singleMessage");
    onValue(userRef, (snapshot) => {
      let arr = [];
      let id = data.activeUser.activeChatUser.receiverId == data.userdata.userInfo.uid ? data.activeUser.activeChatUser.senderId : data.activeUser.activeChatUser.receiverId
      snapshot.forEach((item) => {

        if((item.val().whoSendId == data.userdata.userInfo.uid && item.val().whoReceivedId == id) || (item.val().whoSendId == id && item.val().whoReceivedId== data.userdata.userInfo.uid)){
          arr.push(item.val());
        }
          
      });
      setMsgList(arr);
    });
  },[data])


  let handleEnterKeyPress= (e)=>{
    if(e.key == "Enter"){
      set(push(ref(db, "singleMessage")), {
        msg: msg,
        whoSendId: data.userdata.userInfo.uid,
        whoSendName: data.userdata.userInfo.displayName,
        whoReceivedId:
          data.activeUser.activeChatUser.senderId == data.userdata.userInfo.uid
            ? data.activeUser.activeChatUser.receiverId
            : data.activeUser.activeChatUser.senderId,
          whoReceivedName: data.activeUser.activeChatUser.senderId == data.userdata.userInfo.uid
          ? data.activeUser.activeChatUser.receiverName
          : data.activeUser.activeChatUser.senderName,
        date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
      }).then(()=>{
        setMsg("")
      });
    }
  }
  return (
    <div className="messageBox">
      {data.activeUser.activeChatUser == null ? (
        <Alert style={{ marginTop: "20px", position: "absolute", marginTop: "311px", marginLeft:"203px" }} variant="filled" severity="info">
            Select Message Button From Friends Section.
          </Alert>
      ) : (
        <>
          <div className="chatHeading">

            {/* ==================start message Heading==================== */}
            <div className="whoSendMessage">
              <div className="avatar">
                {/* <Image imgSrc="assets/profile.png" /> */}
                <img src="assets/profileImages/senderImage.jpg" />
              </div>
              <div className="name">
                {console.log(data.activeUser.activeChatUser)}
                {data.activeUser.activeChatUser.senderId == data.userdata.userInfo.uid ? (
                  <h3>{data.activeUser.activeChatUser.receiverName}</h3>
                ) : (
                  <h3>{data.activeUser.activeChatUser.senderName}</h3>
                )}
              </div>
            </div>
            <div className="settingOption">
              <h3>...</h3>
            </div>
          </div>

          {/* ==================start message area==================== */}
          <ScrollToBottom className="chatBody">

            {msgList.map(item=>(

              item.whoSendId == data.userdata.userInfo.uid ? 
                <div className="MyMessage">
              <div className="MyMesagetitle">{item.msg}</div>
              <small className="date">{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</small>
            </div>
                :
                <div className="SenderMessage">
                <div className="SenderMesagetitle">{item.msg}</div>
                <small className="date">{moment(item.date, "YYYYMMDD hh:mm").fromNow()}</small>
              </div>
            ))}
            
          </ScrollToBottom>


          {/* =====================Start inputbox========================== */}
          <div className="chatInput">
            <input className="inputSend" onChange={(e) => setMsg(e.target.value)} placeholder="message" value={msg} onKeyUp={handleEnterKeyPress} type="text" />
            <Button onClick={handleChangeMsg} variant="contained" endIcon={<SendIcon />}>
              {" "}
              Send
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default MessageBox;
