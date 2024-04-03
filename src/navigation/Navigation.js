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
import FullDashboard from '../employee-dashboards/Full-Dashboard';
import ReservationDetails from "../main-screens/ReservationDetails"
import { useState } from 'react';
import CustomerServiceFunctions from '../employee-pages/CustomerServiceFunctions';
import CustomerDetails from '../employee-pages/employee-components/CustomerDetails';
import ApprovalDetails from '../employee-pages/employee-components/ApprovalDetails';
import ReservationConfirmation from '../main-screens/ReservationConfirmation';
import FleetManagement from '../employee-pages/FleetManagement';
import EmployeeManagement from '../employee-pages/EmployeeManagement';


function Navigation() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [isEmployee, setIsEmployee] = useState(localStorage.getItem('isEmployee') === 'true');
    const [employeeRoleNum, setEmployeeRoleNum] = useState(localStorage.getItem('employeeRole'))
    
    function toggleLogIn(login) {
        setIsLoggedIn(login)
    }

    function loginEmployee(employ) {
        setIsEmployee(employ)
    }

    function setEmployeeRole(role) {
        setEmployeeRoleNum(role)
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>

                <Route path = "/" element = {<Layout isLoggedIn = {isLoggedIn} isEmployee = {isEmployee}/>}>

                    <Route index element={<Homepage/>}/>
                    <Route path = "faq" element = {<Faq/>}/>
                    <Route path = "contact" element = {<Contact/>}/>
                    <Route path = "about" element = {<AboutUs/>}/>
                    <Route path = "signup" element = {<Register/>}/>
                    <Route path = "login" element = {<Login toggleLogIn = {toggleLogIn} loginEmployee = {loginEmployee} setEmployeeRole={setEmployeeRole} />}/>
                    <Route path = "account" element = {<Profile toggleLogIn = {toggleLogIn} loginEmployee = {loginEmployee}/>}/>
                    <Route path = "reserve" element = {<Reservation/>}/>
                    <Route path = "registration-confirmation" element = {<Confirmation/>}/>
                    
                    {/* <Route path = "customerservice" element = {<CustomerService/>}/>
                    <Route path = "manager" element = {<Manager/>}/>
                    <Route path = "mechanic" element = {<Mechanic/>}/> */}
                    <Route path = "dash" element = {<FullDashboard employeeRole = {employeeRoleNum}/>}/>
                    <Route path = "customer-approval/:tab" element = {<CustomerServiceFunctions/>}/>
                    <Route path = "customer-details/:id" element = {<CustomerDetails/>}/>
                    <Route path = "approval-details/:id" element = {<ApprovalDetails/>}/>
                    <Route path = "fleet-management" element = {<FleetManagement/>}/>
                    <Route path = "employee-management" element = {<EmployeeManagement/>}/>

                    <Route path = "reservation-details" element = {<ReservationDetails/>}/>
                    <Route path = "reservation-confirmation" element = {<ReservationConfirmation/>}/>
                </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Navigation