import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageLoading } from './layout/Loading';

export const RoleBasedRedirect = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <PageLoading />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Redirect based on user's primary role (or first role if multiple)
    const userRoles = user.roles || [];

    if (userRoles.includes('ADMIN')) {
        return <Navigate to="/admin" replace />;
    } else if (userRoles.includes('HR')) {
        return <Navigate to="/hr/employees" replace />;
    } else if (userRoles.includes('FINANCE')) {
        return <Navigate to="/finance" replace />;
    } else if (userRoles.includes('CONTRACTOR')) {
        return <Navigate to="/projects" replace />;
    } else if (userRoles.includes('EMPLOYEE')) {
        return <Navigate to="/employee" replace />;
    }

    // Fallback for users with no roles or unknown roles
    return <Navigate to="/unauthorized" replace />;
};