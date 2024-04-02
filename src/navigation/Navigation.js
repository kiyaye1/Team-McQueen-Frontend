import React from 'react';
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; 
import EmployeeRoute from './EmployeeRoute'; 
import ProtectedRoute from './ProtectedRoute'; 
import Faq from '../main-screens/Faq';
import Register from '../main-screens/Register';
import AboutUs from '../main-screens/About-us';
import Contact from '../main-screens/Contact';
import Layout from './Layout';
import Homepage from '../main-screens/Homepage';
import Login from '../main-screens/Login';
import Profile from '../main-screens/Profile'
import Reservation from '../main-screens/Reservation'
import Confirmation from '../components/FormConfirmation';
import Admin from '../employee-dashboards/Admin';
import CustomerServiceFunctions from '../employee-pages/CustomerServiceFunctions';
import ReservationDetails from "../main-screens/ReservationDetails";
import EmployeeFunction from '../employee-pages/employee-components/EmployeeFunction';
import CustomerDetails from '../employee-pages/employee-components/CustomerDetails';
import ApprovalDetails from '../employee-pages/employee-components/ApprovalDetails';
import ReservationConfirmation from '../main-screens/ReservationConfirmation';
import InactivityDetector from '../hooks/InactivityDetector';
import useSaveLocation from '../hooks/useSaveLocation';

function Navigation() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    useSaveLocation();

    // useEffect(() => {
    //     const lastLocation = sessionStorage.getItem('lastLocation');
    //     if (lastLocation) {
    //         navigate(lastLocation);
    //     }
    // }, [navigate]);

    const handleLogOut = async () => {
        logout();
        sessionStorage.removeItem('lastLocation');
        navigate('/');
    };

    return (
        <div>
            {/*Check for screen inactivity for about 5 minutes(300000 milliseconds) and
            make a reference to the states and in the local storage, log out user and finally destroy session*/}
            <InactivityDetector
                timeout={300000} // 10 seconds (for testing purposes) 
                onInactive={() => {
                    handleLogOut();
                }}
            />
            <Routes>
                <Route path="/" element={<Layout isLoggedIn={user?.isLoggedIn} isEmployee={user?.isEmployee} />}>
                    <Route index element={<Homepage />} />
                    <Route path="login" element={<Login />} />
                    <Route path = "registration-confirmation" element = {<Confirmation/>}/>
                    <Route element={<ProtectedRoute />}>
                        <Route path = "account" element = {<Profile />}/>
                        <Route path = "reserve" element={<Reservation />}/>
                        <Route path = "reservation-details" element={<ReservationDetails />}/>
                        <Route path = "reservation-confirmation" element = {<ReservationConfirmation />}/>                        
                    </Route>
                    <Route element={<EmployeeRoute />}>
                        <Route path = "dash" element={<Admin /> }/>
                        <Route path = "customer-approval" element={<CustomerServiceFunctions /> }/>
                        <Route path = "employee-information" element={<EmployeeFunction /> }/>   
                        <Route path = "customer-details/:id" element={<CustomerDetails /> }/>
                        <Route path = "approval-details/:id" element={<ApprovalDetails /> }/>                        
                    </Route>
                    <Route path = "faq" element = {<Faq/>}/>
                    <Route path = "contact" element = {<Contact/>}/>
                    <Route path = "about" element = {<AboutUs/>}/>
                    <Route path = "signup" element = {<Register/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default Navigation;
