// components/ProtectedRoute.tsx (updated)
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PageLoading } from './layout/Loading';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: ('ADMIN' | 'HR' | 'CONTRACTOR' | 'FINANCE' | 'EMPLOYEE')[];
    redirectToRoleDashboard?: boolean;
}

export const ProtectedRoute = ({
    children,
    allowedRoles,
    redirectToRoleDashboard = false
}: ProtectedRouteProps) => {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    console.log("Rayaayyaay", user);

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
            if (redirectToRoleDashboard) {
                // Redirect to user's appropriate dashboard instead of unauthorized
                const userRoles = user.roles || [];
                if (userRoles.includes('ADMIN')) return <Navigate to="/admin" replace />;
                if (userRoles.includes('HR')) return <Navigate to="/hr" replace />;
                if (userRoles.includes('FINANCE')) return <Navigate to="/finance" replace />;
                if (userRoles.includes('CONTRACTOR')) return <Navigate to="/projects" replace />;
                if (userRoles.includes('EMPLOYEE')) return <Navigate to="/employee" replace />;
            }
            return <Navigate to="/unauthorized" state={{ from: location }} replace />;
        }
    }

    return <>{children}</>;
};