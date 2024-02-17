import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from '../main-screens/Homepage'
import Login from '../main-screens/Login';
import Faq from '../main-screens/Faq';
import Register from '../main-screens/Register';
import AboutUs from '../main-screens/About-us';
import Contact from '../main-screens/Contact';
import Layout from './Layout'
import Profile from '../main-screens/Profile'
import Reservation from '../main-screens/Reservation'
import { useState } from 'react';


function Navigation() {
    const [isLoggedIn, setIsLoggedIn] = useState()
    
    function toggleLogIn(login) {
        setIsLoggedIn(login)
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                <Route path = "/" element = {<Layout isLoggedIn = {isLoggedIn}/>}>
                    <Route index element={<Homepage/>}/>
                    <Route path = "faq" element = {<Faq/>}/>
                    <Route path = "contact" element = {<Contact/>}/>
                    <Route path = "about" element = {<AboutUs/>}/>
                    <Route path = "signup" element = {<Register/>}/>
                    <Route path = "login" element = {<Login toggleLogIn = {toggleLogIn} />}/>
                    <Route path = "account" element = {<Profile toggleLogIn = {toggleLogIn}/>}/>
                    <Route path = "reserve" element = {<Reservation/>}/>
                </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Navigation