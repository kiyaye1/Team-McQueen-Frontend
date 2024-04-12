import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; 
import EmployeeRoute from './EmployeeRoute'; 
import ProtectedRoute from './ProtectedRoute'; 
import Unauthorized from '../main-screens/Unauthorized';
import Faq from '../main-screens/Faq';
import Register from '../main-screens/Register';
import AboutUs from '../main-screens/About-us';
import Contact from '../main-screens/Contact';
import Layout from './Layout';
import Homepage from '../main-screens/Homepage';
import Login from '../main-screens/Login';
import Profile from '../main-screens/Profile';
import Reservation from '../main-screens/Reservation';
import Confirmation from '../main-screens/FormConfirmation';
import VerifyEmailPage from '../main-screens/VerifyEmailPage';
import FullDashboard from '../employee-dashboards/Full-Dashboard';
import CustomerServiceFunctions from '../employee-pages/CustomerServiceFunctions';
import ReservationDetails from "../main-screens/ReservationDetails";
import CustomerDetails from '../employee-pages/employee-components/CustomerDetails';
import ApprovalDetails from '../employee-pages/employee-components/ApprovalDetails';
import ReservationConfirmation from '../main-screens/ReservationConfirmation';
import InactivityDetector from '../hooks/InactivityDetector';
import FleetManagement from '../employee-pages/FleetManagement';
import EmployeeManagement from '../employee-pages/EmployeeManagement';
import MechanicServiceRequests from '../employee-pages/employee-components/MechanicServiceRequests'
import MetricsDashboard from '../employee-dashboards/MetricsDashboard';
import ApplicationMetrics from '../employee-pages/employee-components/ApplicationMetrics';
import RentalMetrics from '../employee-pages/employee-components/RentalMetrics';

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
        const lastLocation = sessionStorage.getItem('lastLocation');
        if (lastLocation && lastLocation !== location.pathname) {
            navigate(lastLocation, { replace: true });
        }
    }, [location.pathname, navigate]);

    return (
        <div>
            <InactivityDetector
                timeout={600000} 
                onInactive={() => {
                    logout();
                }}
            />
            <Routes>
                <Route path="/" element={<Layout isLoggedIn={user?.isLoggedIn} isEmployee={user?.isEmployee} />}>
                    <Route index element={<Homepage />} />
                    <Route path="login" element={<Login setEmployeeRole={setEmployeeRole}/>} />
                    <Route path="verify-email" element={<VerifyEmailPage />} />
                    <Route path = "registration-confirmation" element = {<Confirmation/>}/>
                    <Route element={<ProtectedRoute />}>
                        <Route path = "account" element = {<Profile />}/>
                        <Route path = "reserve" element={employeeRoleNum != 0 ? <Unauthorized /> : <Reservation />}/>
                        <Route path = "reservation-details" element={employeeRoleNum != 0 ? <Unauthorized /> : <ReservationDetails />}/>
                        <Route path = "reservation-confirmation" element = {employeeRoleNum != 0 ? <Unauthorized /> : <ReservationConfirmation />}/>                        
                    </Route>
                    <Route element={<EmployeeRoute />}>
                    <Route path = "dash" element = {<FullDashboard employeeRole = {employeeRoleNum}/>}/>
                        <Route path = "metrics" element = {<MetricsDashboard />}/>
                        <Route path = "app-metrics" element = {<ApplicationMetrics />}/>
                        <Route path = "rental-metrics" element = {<RentalMetrics />}/>
                        <Route path = "customer-approval/:tab" element = {employeeRoleNum != 3 ? <CustomerServiceFunctions/> : <Unauthorized />}/>
                        <Route path = "customer-details/:id" element = {employeeRoleNum != 3 ? <CustomerDetails/> : <Unauthorized />}/>
                        <Route path = "approval-details/:id" element = {employeeRoleNum != 3 ? <ApprovalDetails/> : <Unauthorized />}/>
                        <Route path = "fleet-management" element={employeeRoleNum != 2 && employeeRoleNum != 4 ? <FleetManagement /> : <Unauthorized /> }/>
                        <Route path = "employee-management" element = {employeeRoleNum != 2 && employeeRoleNum != 3 ? <EmployeeManagement/> : <Unauthorized />}/>  
                        <Route path = "service-requests" element = {employeeRoleNum != 2 && employeeRoleNum != 4 ? <MechanicServiceRequests/> : <Unauthorized/>}/>                   
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
