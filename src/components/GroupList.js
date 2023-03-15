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
// import { useNavigate } from "react-router-dom";

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
  // pointerEvents: "none",
  fontFamily: ["Nunito", "sans-serif"],
  "&:hover": {
    backgroundColor: "#0069d9",
  },
});
const GroupList = () => {
  let data = useSelector((state) => state);
  let db = getDatabase();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let [groupName, setGroupName] = useState("");
  let [groupTag, setGroupTag] = useState("");
  let [loader, setLoader] = useState(false);

  let [groupList, setGroupList] = useState([]);

  let handleCreateGroup = () => {
    setLoader(true);
    set(push(ref(db, "groups")), {
      groupName: groupName,
      groupTag: groupTag,
      adminId: data.userdata.userInfo.uid,
      adminName: data.userdata.userInfo.displayName,
    }).then(() => {
      console.log("updated");
      setLoader(false);
      setOpen(false);
    });
  };

  useEffect(() => {
    onValue(ref(db, "groups"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({...item.val(), gid:item.key});
      });
      setGroupList(arr);
    });
  }, []);

  let handleGroupJoin = (item) => {
    set(push(ref(db, "groupRequest")), {
        groupName: item.groupName,
        groupTag: item.groupTag,
        groupId: item.gid,
        userId:data.userdata.userInfo.uid,
        userName: data.userdata.userInfo.displayName
    }).then(()=>{
        console.log("join request send")
    })
  };
  return (
    <div className="groupholder">
      <div className="titleholder">
        <h3>Group List</h3>
        <button onClick={handleOpen}>Create Group</button>
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
                <button onClick={()=>handleGroupJoin(item)} className="boxbtn">
                  Join
                </button>
              </div>
            </div>
          )
        )}
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Group
          </Typography>

          {loader ? (
            <Dna visible={true} height="80" width="80" ariaLabel="dna-loading" wrapperStyle={{}} wrapperClass="dna-wrapper" />
          ) : (
            <div className="CrGrpInputBox">
              <InputBox textChange={(e) => setGroupName(e.target.value)} className="CrGrpInput" label="Group Name" />
              <InputBox textChange={(e) => setGroupTag(e.target.value)} className="CrGrpInput" label="Group Tag" />
              <PButton click={handleCreateGroup} bName={CommonButton} title="Create" />
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default GroupList;
