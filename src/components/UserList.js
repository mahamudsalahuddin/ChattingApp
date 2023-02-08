import React, { useEffect, useState } from "react";
import Image from "./Image";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
const UserList = () => {
  const db = getDatabase();
  const data = useSelector((state) => state);
  let [userlist, setUserlist] = useState([]);

  useEffect(() => {
    const userRef = ref(db, "users");
    onValue(userRef, (snapshot) => {
      let arr = [];
      snapshot.forEach(item => {
          if(data.userdata.userInfo.uid != item.key){
            arr.push(item.val());
        }
      });
      setUserlist(arr);
    });
  }, []);
  return (
    <div className="groupholder">
      <div className="titleholder">
        <h3>User List</h3>
      </div>
      <div className="boxholder">
        {userlist.map(item=>(
            
            <div className='box'>
                <div className='boxImgholder'>
                    <Image imgSrc="assets/profile.png"/>
                </div>
                <div className='title'>
                    <h3>{item.displayName}</h3>
                    <p>{item.email}</p>
                </div>
                <div>
                    <button className='boxbtn'>Add</button>
                </div>
            </div>

            ))}
      </div>
    </div>
  );
};

export default UserList;
