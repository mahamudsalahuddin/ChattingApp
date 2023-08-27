import React, { useEffect, useState } from "react";
import Image from "./Image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputBox from "./InputBox";
import TextField from "@mui/material/TextField";
import PButton from "./PButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { Dna } from "react-loader-spinner";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
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
const JoinGroupList = () => {
  let data = useSelector((state) => state);
  let db = getDatabase();

  let [groupName, setGroupName] = useState("");
  let [groupTag, setGroupTag] = useState("");
  let [loader, setLoader] = useState(false);
  let [groupList, setGroupList] = useState([]);

  useEffect(() => {
    onValue(ref(db, "groups"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({...item.val(), gid:item.key});
      });
      setGroupList(arr);
    });
  }, []);

  let handleChat= (item)=>{
    console.log(item);
  }
  return (
    <div className="groupholder">
      <div className="titleholder">
        <h3>Group List</h3>
        <button>Group</button>
      </div>
      <div className="boxholder">
        {groupList.map((item, key) =>
          data.userdata.userInfo.uid == item.adminId ? (
            <div key={key} className="box">
              <div className="boxImgholder">
                <Image imgSrc="assets/profile.png" />
              </div>
              <div className="title">
                <h3>{item.groupName}</h3>
                <p>{item.groupTag}</p>
              </div>
              <div>
                <button onClick={()=>handleChat(item)} className="boxbtn">
                  Chat
                </button>
              </div>
            </div>
          ) : (
            <div key={key} className="box">
              <div className="boxImgholder">
                <Image imgSrc="assets/profile.png" />
              </div>
              <div className="title">
                <h3>{item.groupName}</h3>
                <p>{item.groupTag}</p>
              </div>
              <div>
                <button onClick={()=>handleChat(item)} className="boxbtn">
                  Chat
                </button>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default JoinGroupList