import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import Image from "./Image";
import { ToastContainer } from "react-toastify";
import Alert from "@mui/material/Alert";
const Friends = () => {
  const db = getDatabase();
  let [friends, setFriends] = useState([]);
  const data = useSelector((state) => state);

  useEffect(() => {
    const userRef = ref(db, "friends");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.userdata.userInfo.uid == item.val().receiverId || data.userdata.userInfo.uid == item.val().senderId) {
          // akhon j login ase tar sathe je friendrequesr receive othoba send korse se ak kina
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setFriends(arr);
    });
  }, []);

  let handleBlock = (item) => {
    if (data.userdata.userInfo.uid == item.senderId) {
      set(push(ref(db, "block")), {
        blockOn: item.receiverName,
        blockOnId: item.receiverId,
        blockBy: item.senderName,
        blockById: item.senderId,
      }).then(() => {
        remove(ref(db, "friends/" + item.key)).then(() => {
          console.log("block");
        });
      });
    } else {
      set(push(ref(db, "block")), {
        blockOn: item.senderName,
        blockOnId: item.senderId,
        blockBy: item.receiverName,
        blockById: item.receiverId,
      }).then(() => {
        remove(ref(db, "friends/" + item.key)).then(() => {
          console.log("block");
        });
      });
    }
  };
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
        <h3>Friends</h3>
      </div>
      <div className="boxholder">
        {
        friends.length > 0?
        friends.map((item, key) => (
          <div key={key} className="box">
            <div className="boxImgholder">
              <Image imgSrc="assets/profile.png" />
            </div>
            <div className="title">
              {data.userdata.userInfo.uid == item.receiverId ? <h3>{item.senderName}</h3> : <h3>{item.receiverName}</h3>}

              <p>Hi Guys, Wassup!</p>
            </div>
            <div>
              <button onClick={() => handleBlock(item)} className="boxbtn">
                Block
              </button>
            </div>
          </div>
        ))
        :
        <Alert style={{ marginTop: "20px" }} variant="filled" severity="info">
            You Have No Friends
          </Alert>
        
        }
      </div>
    </div>
  );
};

export default Friends;
