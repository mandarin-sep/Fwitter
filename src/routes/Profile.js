import { signOut } from "firebase/auth"
import React from "react"
import { authService } from "../myBase"
import { useNavigate } from "react-router-dom"

export default function Profile(){
    const history = useNavigate();
    const onLogOutClick = () =>{
        signOut(authService);
        history("/")
    } 
    return(
        <>
        <button onClick={onLogOutClick}> Log Out</button>
        </>
    )
}