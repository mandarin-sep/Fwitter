import { addDoc, collection, getDocs, onSnapshot, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react"
import { dbService } from "../myBase";
import Fweet from "../components/Fweet"

export default function Home({userObj}){
    const [fweet, setFweet] = useState("");
    const [fweets, setFweets] = useState([]);

    // const getFweets = async () => {
    //     const dbFweets  =  await getDocs(collection(dbService, "fweets"))
    //     dbFweets.forEach(documents => {
    //         const fweetsObject = {
    //             ...documents.data(),
    //             id: documents.id
    //         }
    //         setFweets((prev) => [ ...prev, fweetsObject])
    //     }
    //     )}


    useEffect(() => {
        onSnapshot(collection(dbService, "fweets"), ( sanpshot => {
            const fweetArray = sanpshot.docs.map((doc => ({
                id: doc.id,
                ...doc.data(),
            })));
            setFweets(fweetArray)
        })) 
            
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        

        //FireBase에 FireStore에 Data를 추가하려면 setDoc / addDoc 인데 전자는 Doc 아이디를 명시해줘야 하고 후자는 자동으로 생성하게 해준다
        await addDoc(collection(dbService, "fweets"),{
            text: fweet,
            createdAt: serverTimestamp(),
            creatorId: userObj.uid,
        })

        setFweet("");
    }

    const onChange = (e) => {
        const { target: { value }} = e;
        setFweet(value)
    }

    return <div>
        <form onSubmit={onSubmit}>

            <input value={fweet} type="text" onChange={onChange} placeholder="무슨 생각을 하고 계신가요?" maxLength={120} />
            <input type="submit" value="Fweet" />
        </form>
        <div>
            { fweets.map( (fweet) => 
                <Fweet key= {fweet.id} fweetObj={fweet} isOwner={fweet.creatorId === userObj.uid}/> )}
        </div>
    </div>
}