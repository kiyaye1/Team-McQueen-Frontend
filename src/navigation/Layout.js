import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import logo from './gyrogogo-logo.png'; 
import { useAuth } from '../context/AuthContext';

function Layout() {
    const { user } = useAuth();
    console.log(user);
    return (
        <>
            <div className="content-center p-4 shadow-lg">
                <div className="flex justify-between">
                    <Link to="/"><img className="h-auto w-16 md:w-20 lg:w-24" src={logo} alt="Logo" /></Link>
                    <div className="text-right font-medium text-sm">
                        {user && user.isLoggedIn && (
                            <>
                                <Link to="/reserve" className="p-4">Reserve</Link>
                                <Link to = "/faq" class = "p-4">FAQ</Link>
                                <Link to = "/contact" class = "p-4">Contact Us</Link>
                                <Link to = "/about" class = "p-4">About Us</Link>
                                <Link to = "/account" class = "p-4">Profile</Link>
                            </>
                        )}
                        {user && user.isEmployee && (
                            <Link to="/dash" className="p-4">Admin Dash</Link>
                        )}
                        {!user && (
                            <>
                                <Link to="/faq" className="p-4">FAQ</Link>
                                <Link to="/contact" className="p-4">Contact Us</Link>
                                <Link to="/about" className="p-4">About Us</Link>
                                <Link to="/signup" className="p-4">Sign Up</Link>
                                <Link to="/login" className="p-4">Log In</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Outlet />
        </>
    );
}

export default Layout;
