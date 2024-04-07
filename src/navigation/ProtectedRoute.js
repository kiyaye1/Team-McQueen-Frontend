import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Unauthorized from '../main-screens/Unauthorized';

const ProtectedRoute = () => {
    const { user } = useAuth();
    console.log(user);
    if (!user || !user.isLoggedIn) {
        return <Unauthorized />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
