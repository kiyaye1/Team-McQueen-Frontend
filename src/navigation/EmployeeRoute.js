import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Unauthorized from '../main-screens/Unauthorized';

const EmployeeRoute = () => {
    const { user } = useAuth();
    if (!user || !user.isLoggedIn || !user.isEmployee) {
        return <Unauthorized />;
    }
    return <Outlet />;
};

export default EmployeeRoute;
