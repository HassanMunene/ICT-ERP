import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageLoading } from './layout/Loading';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: ('ADMIN' | 'HR' | 'CONTRACTOR' | 'FINANCE' | 'EMPLOYEE')[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <PageLoading />;
    }

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If specific roles are required, check if user has at least one of them
    if (allowedRoles && allowedRoles.length > 0) {
        const hasRequiredRole = user.roles?.some(role => allowedRoles.includes(role as any));

        if (!hasRequiredRole) {
            // User is authenticated but doesn't have the required role
            return <Navigate to="/unauthorized" state={{ from: location }} replace />;
        }
    }

    // User is authenticated and has required role (if any)
    return <>{children}</>;
};