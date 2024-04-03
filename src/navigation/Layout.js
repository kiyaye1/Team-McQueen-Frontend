import {Outlet, Link} from "react-router-dom"
import logo from './gyrogogo-logo.png'
import { useState } from "react"
import { Button } from "@mui/material"


// TODO: on login --- put a login as employee button and function same as 
// the way we are simulating customer login rn 


function Layout({isLoggedIn, isEmployee}) {

    if(isLoggedIn) {
        return (
            <>
            <div class = "content-center p-4 shadow-lg">
                <div class = "flex justify-between">
                    <Link to = "/"><img class =  "h-auto w-16 md:w-20 lg:w-24" src ={logo} alt = "Logo"/></Link>
                    <div class = "text-right font-medium text-sm">
                        <Link to = "/reserve" class = "p-4">Reserve</Link>
                        <Link to = "/faq" class = "p-4">FAQ</Link>
                        <Link to = "/contact" class = "p-4">Contact Us</Link>
                        <Link to = "/about" class = "p-4">About Us</Link>
                        <Link to = "/account" class = "p-4">Profile</Link>
                    </div>
                </div>
            </div>
            
           
            <Outlet/>

          
    
            </>
        )

    } else if(isEmployee) {
        return (
            <>
            <div class = "content-center p-4 shadow-lg">
                <div class = "flex justify-between">
                    <Link to = "/"><img class =  "h-auto w-16 md:w-20 lg:w-24" src ={logo} alt = "Logo"/></Link>
                    <div class = "text-right font-medium text-sm">
                        <Link to = "/dash" class = "p-4">Dashboard</Link>
                        <Link to = "/account" class = "p-4">Profile</Link>
                    </div>
                </div>
            </div>
            
           
            <Outlet/>

          
    
            </>
        )
    } else {
        return (
            <>
            <div class = "content-center p-4 shadow-lg">
                <div class = "flex justify-between">
                    <Link to = "/"><img class =  "h-auto w-16 md:w-20 lg:w-24" src ={logo} alt = "Logo"/></Link>
                    <div class = "text-right font-medium text-sm">
                        <Link to = "/faq" class = "p-4">FAQ</Link>
                        <Link to = "/contact" class = "p-4">Contact Us</Link>
                        <Link to = "/about" class = "p-4">About Us</Link>
                        <Link to = "/signup" class = "p-4">Sign Up</Link>
                        <Link to = "/login" class = "p-4">Log In</Link>
                    </div>
                </div>
            </div>
            
            <Outlet/>
    
            </>
        )

    }
};

export default Layout;