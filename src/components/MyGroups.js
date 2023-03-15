import React, { useEffect, useState } from "react";
import Image from "./Image";
import { getDatabase, ref, onValue} from "firebase/database";
import { useSelector } from "react-redux";
const MyGroups = () => {

  const db = getDatabase();
  let data = useSelector(state=>state)
  let [myGroup, setMyGroup] = useState([])

  useEffect(()=>{
    const starCountRef = ref(db, 'groups');
    onValue(starCountRef, (snapshot) => {
      let arr=[]
      snapshot.forEach(item=>{
        if(data.userdata.userInfo.uid == item.val().adminId){
          arr.push({...item.val(), groupKye: item.key})
        }
      })
      setMyGroup(arr)
    });
  }, [])
  return (
    <div className="groupholder">
      <div className="titleholder">
        <h3>My Groups</h3>
      </div>
      <div className="boxholder">
        {myGroup.map((item, key) =>(
          <div key={key} className="box">
          <div className="boxImgholder">
            <Image imgSrc="assets/profile.png" />
          </div>
          <div className="title">
            <h3>{item.groupName}</h3>
            <p>{item.groupTag}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default MyGroups;
