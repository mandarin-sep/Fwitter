import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react"
import { dbService } from "../myBase";

export default function Fweet({ fweetObj, isOwner }){

    const [editing, setEditing] = useState(false);
    const [editingText, setEditingText] = useState(fweetObj.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("진짜로 삭제합니까?");
        if(ok){
            await deleteDoc(doc(dbService, `fweets`,`${fweetObj.id}`))
        }
    }

    const toggleEdting = () => {
        setEditing((prev) => !prev)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await updateDoc(doc(dbService, "fweets", `${fweetObj.id}`), {
            text: editingText
        })
        setEditing(false)
        
    }

    const onChange = (e) => {
        const {target: {value}} = e
        setEditingText(value)
    }

    return (
    <div>
        {
            editing ? (
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" value={editingText} required onChange={onChange}/>
                        <input type="submit" value="Update Fweet" />
                    </form> 
                    <button onClick={toggleEdting}>취소</button>
                </>
            ) : (
            <>
                <h4>{fweetObj.text}</h4>
                {isOwner && <>
                    <button onClick={onDeleteClick}>Delete</button>
                    <button onClick={toggleEdting}>Edit</button>
                </>}
            </>
            )
        }
    </div>
    )
}