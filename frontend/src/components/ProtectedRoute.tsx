import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { user, isAuthenticated, isLoading } = useAuth();
    console.log('Protected Route Auth Status: ', isAuthenticated);

    // Wait until we know the authentication state
    if (isLoading) {
        return<h1>Loading...</h1>;
    } 

    // User in not authenticated/logged in, navigate back to login
    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    // If roles are provided, enforce Role Based Access Control (RBAC)
    if (allowedRoles) {
        const hasAccess = allowedRoles.some(
            role => 
                user?.roles.includes(role) ||
                user?.roles.includes('SYSADMIN')
        );

        // if RBAC is in place and permitted role is present
        if (!hasAccess) {
            return <Navigate to='/unauthorized' replace />
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;