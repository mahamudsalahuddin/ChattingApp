import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { activeChatUser } from "../slices/activeChatSlice";
import Image from "./Image";
const MessageFriend = () => {
  const db = getDatabase();
  let [friends, setFriends] = useState([]);
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
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

  let handleActiveChat = (item) => {
    console.log(item);
    dispatch(activeChatUser({ ...item, status: "single" }));
  };
  return (
    <div className="groupholder">
      <div className="titleholder">
        <h3>Friends</h3>
      </div>
      <div className="boxholder">
        {friends.map((item, key) => (
          <div key={key} className="box">
            <div className="boxImgholder">
              <Image imgSrc="assets/profile.png" />
            </div>
            <div className="title">
              {data.userdata.userInfo.uid == item.receiverId ? <h3>{item.senderName}</h3> : <h3>{item.receiverName}</h3>}

              <p>Hi Guys, Wassup!</p>
            </div>
            <div>
              <button onClick={() => handleActiveChat(item)} className="boxbtn">
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageFriend;
