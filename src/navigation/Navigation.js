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
import Confirmation from '../components/FormConfirmation';
import CustomerService from '../employee-dashboards/CustomerService';
import Manager from '../employee-dashboards/Manager';
import Admin from '../employee-dashboards/Admin';
import Mechanic from '../employee-dashboards/Mechanic';
import { useState } from 'react';


function Navigation() {
    const [isLoggedIn, setIsLoggedIn] = useState()
    
    function toggleLogIn(login) {
        setIsLoggedIn(login)
    }

    const [isEmployee, setIsEmployee] = useState(false)

    function loginEmployee(employ) {
        setIsEmployee(employ)
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                <Route path = "/home" element = {<Layout isLoggedIn = {isLoggedIn}/>}>
                    <Route index element={<Homepage/>}/>
                    <Route path = "faq" element = {<Faq/>}/>
                    <Route path = "contact" element = {<Contact/>}/>
                    <Route path = "about" element = {<AboutUs/>}/>
                    <Route path = "signup" element = {<Register/>}/>
                    <Route path = "login" element = {<Login toggleLogIn = {toggleLogIn} loginEmployee = {loginEmployee} />}/>
                    <Route path = "account" element = {<Profile toggleLogIn = {toggleLogIn} loginEmployee = {loginEmployee}/>}/>
                    <Route path = "reserve" element = {<Reservation/>}/>
                    <Route path = "registration-confirmation" element = {<Confirmation/>}/>
                    <Route path = "customerservice" element = {<CustomerService/>}/>
                    <Route path = "manager" element = {<Manager/>}/>
                    <Route path = "mechanic" element = {<Mechanic/>}/>
                    <Route path = "admin" element = {<Admin/>}/>
                </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Navigation