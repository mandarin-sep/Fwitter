import { authService, app } from "../myBase";
import React, { useState } from "react"
import { signInWithEmailAndPassword,
    createUserWithEmailAndPassword, 
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
} from 'firebase/auth'

export default function Auth(){
    const [email, setEmail ] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount ] = useState(true);
    const [error, setError] = useState("");


    const onChange = (e) => {
        const { target: {name, value}} = e;
        if(name === "email"){
            setEmail(value)
        }else if( name === "password") {
            setPassword(value)
        }
    }
    const onSubmit = async(e) => {
        e.preventDefault();  
        try {
            if(newAccount) {
                //createAccount
               const data = await createUserWithEmailAndPassword(
                authService, email, password
                )
            } else {
                //Login
                const data = await signInWithEmailAndPassword( authService, email, password)
            }

        } catch(err) {
            setError(err.message)
        }
    }

    const toggleAccount = () => setNewAccount ((prev) => !prev)
    const onSocialClick = async (e) => {
        const { target: { name }, } = e;
        let provider;
        if(name === "google") {
            provider = new GoogleAuthProvider()
        } else if(name === "github"){
            provider = new GithubAuthProvider()
        }

        const data = await signInWithPopup(authService, provider)
    }
    return <div>
        <form onSubmit={onSubmit}>
            <input
             name="email"
             type="email" 
             placeholder="Email" 
             required 
             value={email}
             onChange={onChange} 
             />
            <input 
            name="password" 
            type="password"
            placeholder="Password" 
            required
            value={ password }
            onChange={onChange}  
            />
            <input type="submit" value={ newAccount ? "계정생성" : "Log In"}/>
            {error}
        </form>
    <span onClick={toggleAccount}> { newAccount ? "Log In" : "계정 생성 "}</span>

        <div>
            <button name="google" onClick={onSocialClick}> Google 로그인 </button>
            <button name="github" onClick={onSocialClick}> Github 로그인 </button>
        </div>
    </div>
}