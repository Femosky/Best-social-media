// import { ReactNode } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function PrivateRoutes() {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? <Outlet /> : <Navigate to="login" />;
}
