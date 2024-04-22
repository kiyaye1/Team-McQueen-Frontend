import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '../context/AuthContext'; 
import Layout from './Layout';
import Homepage from '../main-screens/Homepage';
import AboutUs from '../main-screens/About-us';
import Faq from '../main-screens/Faq';
import Contact from '../main-screens/Contact';
import Register from '../main-screens/Register';
import VerifyEmailPage from '../main-screens/VerifyEmailPage';
import Confirmation from '../main-screens/FormConfirmation';
import Login from '../main-screens/Login';
import ProtectedRoute from './ProtectedRoute'; 
import Profile from '../main-screens/Profile';
import Reservation from '../main-screens/Reservation';
import Confirmation from '../main-screens/FormConfirmation';
import VerifyEmailPage from '../main-screens/VerifyEmailPage';
import FullDashboard from '../employee-dashboards/Full-Dashboard';
import CustomerServiceFunctions from '../employee-pages/CustomerServiceFunctions';
import ReservationDetails from "../main-screens/ReservationDetails";
import ReservationConfirmation from '../main-screens/ReservationConfirmation';
import FullDashboard from '../employee-dashboards/Full-Dashboard';
import EmployeeRoute from './EmployeeRoute';
import EmployeeManagement from '../employee-pages/EmployeeManagement';
import ApprovalRequests from '../employee-pages/employee-components/ApprovalRequests';
import ApprovalDetails from '../employee-pages/employee-components/ApprovalDetails';
import MembersInfo from '../employee-pages/employee-components/MembersInfo';
import CustomerDetails from '../employee-pages/employee-components/CustomerDetails';
import CustomerInquiries from '../employee-pages/employee-components/CustomerInquiries';
import InquiryDetails from '../employee-pages/employee-components/InquiryDetails';
import MechanicServiceRequests from '../employee-pages/MechanicServiceRequests'
import ServiceRequestDetails from '../employee-pages/employee-components/ServiceRequestDetails';
import FleetManagement from '../employee-pages/FleetManagement';
import MetricsDashboard from '../employee-dashboards/MetricsDashboard';
import ApplicationMetrics from '../employee-pages/ApplicationMetrics';
import RentalMetrics from '../employee-pages/RentalMetrics';
import Unauthorized from '../main-screens/Unauthorized';
import InactivityDetector from '../hooks/InactivityDetector';

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

    function setEmployeeRole(role) {
        setEmployeeRoleNum(role)
    }

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
                        <Route path = "customer-approvals" element = {employeeRoleNum != 3 ? <ApprovalRequests/> : <Unauthorized />}/>
                        <Route path = "approval-details/:id" element = {employeeRoleNum != 3 ? <ApprovalDetails/> : <Unauthorized />}/>
                        <Route path = "members-info" element = {employeeRoleNum != 3 ? <MembersInfo/> : <Unauthorized/>}/>
                        <Route path = "customer-details/:id" element = {employeeRoleNum != 3 ? <CustomerDetails/> : <Unauthorized />}/>
                        <Route path = "customer-inquiries" element = {employeeRoleNum != 3 ? <CustomerInquiries/> : <Unauthorized/>}/>
                        <Route path = "inquiry-details/:id" element = {employeeRoleNum != 3 ? <InquiryDetails/> : <Unauthorized/>}/>
                        <Route path = "service-requests" element = {employeeRoleNum != 2 && employeeRoleNum != 4 ? <MechanicServiceRequests/> : <Unauthorized/>}/>
                        <Route path = "service-request-details/:id" element = {employeeRoleNum != 3 ? <ServiceRequestDetails/>:<Unauthorized/>}/>
                        <Route path = "fleet-management" element={employeeRoleNum != 2 && employeeRoleNum != 4 ? <FleetManagement /> : <Unauthorized /> }/>
                        <Route path = "employee-management" element = {employeeRoleNum != 2 && employeeRoleNum != 3 ? <EmployeeManagement/> : <Unauthorized />}/>  
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