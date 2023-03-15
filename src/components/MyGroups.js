import React, { useEffect, useState } from "react";
import Image from "./Image";
import { getDatabase, ref, onValue , remove} from "firebase/database";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Stack from '@mui/material/Stack';
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

const MyGroups = () => {
  const db = getDatabase();
  let data = useSelector((state) => state);
  let [myGroup, setMyGroup] = useState([]);
  let [myGroupRequest, setMyGroupRequest] = useState([]);

  const [open, setOpen] = React.useState(false);

  const handleOpen = (id) => {
    setOpen(true);
    const starCountRef = ref(db, "groupRequest");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (id == item.val().groupId) {
          arr.push({ ...item.val(), DelId: item.key });
        }
      });
      setMyGroupRequest(arr);
    });
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const starCountRef = ref(db, "groups");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.userdata.userInfo.uid == item.val().adminId) {
          arr.push({ ...item.val(), groupId: item.key });
        }
      });
      setMyGroup(arr);
    });
  }, []);
  // let handleGroupMamberRequest = (item) => {
  //   console.log(item);
  //   console.log(data.userdata.userInfo.uid);
  // };

  let handleGroupRequestReject= (id)=>{
    remove(ref(db, "groupRequest/"+id)).then(()=>{
      console.log("Reject Friend request")

    })
  }
  return (
    <div className="groupholder">
      <div className="titleholder">
        <h3>My Groups</h3>
      </div>
      <div className="boxholder">
        {myGroup.map((item, key) => (
          <div key={key} className="box">
            <div className="boxImgholder">
              <Image imgSrc="assets/profile.png" />
            </div>
            <div className="title">
              <h3>{item.groupName}</h3>
              <p>{item.groupTag}</p>
            </div>
            <div>
              <button className="boxbtn">G-Inf</button>
              <button onClick={() => handleOpen(item.groupId)} className="boxbtn">
                M-Request
              </button>
            </div>
          </div>
        ))}
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Mamber Request
          </Typography>
            {/* ================================================================== */}
            <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>

              {myGroupRequest.map((item, key)=>(
                <div key={key}>
                  <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={item.userName}
                />
                <Stack  direction="row" spacing={2}>
                  <Button onClick={()=>handleGroupRequestReject(item.DelId)} variant="outlined">
                    Reject
                  </Button>
                  <Button variant="contained">
                    Accept
                  </Button>
                </Stack>
              </ListItem>
              <Divider variant="inset" component="li" />
                </div>
              ))}
              
            </List>
            {/* ================================================================== */}
        </Box>
      </Modal>
    </div>
  );
};

export default MyGroups;
