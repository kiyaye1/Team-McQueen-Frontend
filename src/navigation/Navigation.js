import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import Profile from '../main-screens/Profile';
import Reservation from '../main-screens/Reservation';
import Confirmation from '../components/FormConfirmation';
import FullDashboard from '../employee-dashboards/Full-Dashboard';
import CustomerServiceFunctions from '../employee-pages/CustomerServiceFunctions';
import ReservationDetails from "../main-screens/ReservationDetails";
import CustomerDetails from '../employee-pages/employee-components/CustomerDetails';
import ApprovalDetails from '../employee-pages/employee-components/ApprovalDetails';
import ReservationConfirmation from '../main-screens/ReservationConfirmation';
import InactivityDetector from '../hooks/InactivityDetector';
import FleetManagement from '../employee-pages/FleetManagement';
import EmployeeManagement from '../employee-pages/EmployeeManagement';
import MechanicFunctions from '../employee-pages/MechanicFunction';

function Navigation() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [employeeRoleNum, setEmployeeRoleNum] = useState(sessionStorage.getItem('employeeRole'));

    function setEmployeeRole(role) {
        setEmployeeRoleNum(role)
    }

    useEffect(() => {
        const isReservationActive = sessionStorage.getItem('reservationActive') === 'true';
        // Update the last location only if the reservation process is not active
        if (!isReservationActive) {
            sessionStorage.setItem('lastLocation', location.pathname);
        }
    }, [location]);

    useEffect(() => {
        // Decide where to navigate based on the reservation active flag
        const lastLocation = sessionStorage.getItem('lastLocation');
        if (lastLocation) {
            navigate(lastLocation);
        }
    }, [navigate]);

    function setEmployeeRole(role) {
        setEmployeeRoleNum(role)
    }

    return (
        <div>
            <InactivityDetector
                timeout={3600000} 
                onInactive={() => {
                    logout();
                }}
            />
            <Routes>
                <Route path="/" element={<Layout isLoggedIn={user?.isLoggedIn} isEmployee={user?.isEmployee} />}>
                    <Route index element={<Homepage />} />
                    <Route path="login" element={<Login setEmployeeRole={setEmployeeRole}/>} />
                    <Route path = "registration-confirmation" element = {<Confirmation/>}/>
                    <Route element={<ProtectedRoute />}>
                        <Route path = "account" element = {<Profile />}/>
                        <Route path = "reserve" element={<Reservation />}/>
                        <Route path = "reservation-details" element={<ReservationDetails />}/>
                        <Route path = "reservation-confirmation" element = {<ReservationConfirmation />}/>                        
                    </Route>
                    <Route element={<EmployeeRoute />}>
                        <Route path = "dash" element = {<FullDashboard employeeRole = {employeeRoleNum}/>}/>
                        <Route path = "customer-approval/:tab" element = {<CustomerServiceFunctions/>}/>
                        <Route path = "customer-details/:id" element = {<CustomerDetails/>}/>
                        <Route path = "approval-details/:id" element = {<ApprovalDetails/>}/>
                        <Route path = "fleet-management" element = {<FleetManagement/>}/>
                        <Route path = "employee-management" element = {<EmployeeManagement/>}/>    
                        <Route path = "mechanic-functions/:tab" element = {<MechanicFunctions/>}/>                   
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
