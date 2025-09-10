import React from 'react';
import { ShieldOff, Home, LogIn, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const UnauthorizedPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const from = location.state?.from?.pathname || '/dashboard';

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoToLogin = () => {
        logout();
        navigate('/login', { state: { from: location }, replace: true });
    };

    const handleTryAgain = () => {
        // Go back to previous page
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-red-100 rounded-full">
                        <ShieldOff className="h-12 w-12 text-red-600" />
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Access Denied
                </h1>

                {/* Message */}
                <p className="text-gray-600 mb-6">
                    {user ? (
                        <>
                            Sorry <span className="font-semibold">{user.firstName}</span>,
                            you don't have permission to access this page.
                        </>
                    ) : (
                        'You need to be logged in to access this page.'
                    )}
                </p>

                {/* Technical Details (Helpful for debugging) */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Details</span>
                    </div>
                    <p className="text-xs text-gray-600">
                        Attempted to access: <code className="bg-gray-100 px-1 rounded">{from}</code>
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    {user ? (
                        <>
                            <button
                                onClick={handleTryAgain}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={handleGoHome}
                                className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <Home className="h-4 w-4" />
                                Go to Home page
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleGoToLogin}
                            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            <LogIn className="h-4 w-4" />
                            Sign In
                        </button>
                    )}
                </div>

                {/* Support Contact */}
                <p className="text-xs text-gray-500 mt-6">
                    Need access? Contact your system administrator or
                    <a href="mailto:support@icterp.com" className="text-blue-600 hover:underline ml-1">
                        IT support
                    </a>
                </p>
            </div>
        </div>
    );
};

export default UnauthorizedPage;