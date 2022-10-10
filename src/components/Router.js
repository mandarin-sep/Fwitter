import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom" 
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation.js";
import Profile from "../routes/Profile"


export default function AppRouter({ isLoggedIn, userObj }){
    

    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? 
                <>
                <Route exact path="/" element={<Home userObj={userObj}/>}></Route> 
                <Route exact path="/profile" element={<Profile />}></Route> 
                </>
                : 
                <Route excact path="/" element={ <Auth/>}></Route>}
            </Routes>
        </Router>
    )
}