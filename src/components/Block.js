import React,{ useEffect, useState} from 'react'
import { getDatabase, onValue, ref, set, push, remove} from 'firebase/database'
import { useSelector } from 'react-redux'
import Image from './Image'
const Block = () => {
    let db = getDatabase();
    let data = useSelector((state)=>state);
    let [userBlock, setUserBlock]= useState([])
    useEffect(()=>{
        onValue(ref(db, "block"), (snapshot)=>{
            let arr=[]
            snapshot.forEach(item=>{
                if(item.val().blockById == data.userdata.userInfo.uid){

                    arr.push({
                        id: item.key,
                        blockOn: item.val().blockOn,
                        blockOnId: item.val().blockOnId
                    });
                }else if(item.val().blockOnId == data.userdata.userInfo.uid){
                    arr.push({
                        id: item.key,
                        blockBy: item.val().blockBy,
                        blockById: item.val().blockById
                    });
                }
            })
            setUserBlock(arr)
        })
    }, [])

    let handleUnblock= (item)=>{
        console.log(item)
        set(push(ref(db, "friends")), {
            receiverName : item.blockOn,
            receiverId: item.blockOnId,
            senderName: data.userdata.userInfo.displayName,
            senderId: data.userdata.userInfo.uid
        }).then(()=>{
            remove(ref(db, "block/"+item.id))
        }).then(()=>{
            console.log("successfully unblocked")
        })
    }
  return (
    <div className='groupholder'>
    <div className='titleholder'>
        <h3>Blocked Users</h3>
    </div>
    <div className='boxholder'>
        {userBlock.map((item)=>(
            <div className='box'>
            <div className='boxImgholder'>
                <Image imgSrc="assets/profile.png"/>
            </div>
            <div className='title'>
                <h3>
                    {
                        item.blockOn ?
                        <h3>{item.blockOn}</h3>
                        :
                        <h3>{item.blockBy}</h3>
                    }
                </h3>
                <p>Hi Guys, Wassup!</p>
            </div>
            <div>
                {item.blockOn?
                <button onClick={()=>handleUnblock(item)} className='boxbtn'>Unblock</button>
                :
                <button className='boxbtn'>Blocked</button>
                }
            </div>
        </div>
        ))}
    </div>
</div>
  )
}

export default Block