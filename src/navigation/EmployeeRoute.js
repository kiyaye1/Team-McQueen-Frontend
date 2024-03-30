import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const EmployeeRoute = () => {
    const { user } = useAuth();
    if (!user || !user.isLoggedIn || !user.isEmployee) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};

export default EmployeeRoute;
