import {Outlet, Link} from "react-router-dom"
import logo from './gyrogogo-logo.png'

// not logged in --> Home, FAQ, Contact us, About us, Sign up, Log in 
// logged in --> reservations (home), FAQ, contact us, about us, My account


const NotLoggedInLayout = () => {
    return (
        <>
        <div class = "content-center p-4 shadow-lg">
            <div class = "flex justify-between">
                <img class =  "h-auto w-16 md:w-20 lg:w-24" src ={logo} alt = "Logo"/>
                <div class = "text-right font-medium text-sm">
                    <a href = "/" class = "p-4">Home</a>
                    <a href = "/faq" class = "p-4">FAQ</a>
                    <a href = "/contact" class = "p-4">Contact Us</a>
                    <a href = "/about" class = "p-4">About Us</a>
                    <a href = "/signup" class = "p-4">Sign Up</a>
                    <a href = "/login" class = "p-4">Log In</a>
                </div>
            </div>
        </div>
        
        <Outlet/>

        </>
    )
};

export default NotLoggedInLayout;