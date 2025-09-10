import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';

type User = {
  id: string;
  email: string;
  roles: ('ADMIN' | 'HR' | 'CONTRACTOR' | 'FINANCE' | 'EMPLOYEE')[];
  firstName: string;
  lastName: string;
  createdAt: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
    loading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const JWT_TOKEN_KEY = 'jwt_token';
const USER_DATA_KEY = 'user_data';

// Simple localStorage helper
const storage = {
    set: (key: string, value: any) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn('LocalStorage set failed:', error);
        }
    },

    get: (key: string): any => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.warn('LocalStorage get failed:', error);
            return null;
        }
    },

    remove: (key: string) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.warn('LocalStorage remove failed:', error);
        }
    },

    clear: () => {
        try {
            localStorage.removeItem(JWT_TOKEN_KEY);
            localStorage.removeItem(USER_DATA_KEY);
        } catch (error) {
            console.warn('LocalStorage clear failed:', error);
        }
    }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = storage.get(JWT_TOKEN_KEY);
            const savedUser = storage.get(USER_DATA_KEY);

            if (token && savedUser) {
                setUser(savedUser);
            }
        } catch (error) {
            console.error('Authentication check failed:', error);
            storage.clear();
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const { user: userData, token } = response.data;

            // Store token and user data in localStorage
            storage.set(JWT_TOKEN_KEY, token);
            storage.set(USER_DATA_KEY, userData);
            setUser(userData);
        } catch (error: any) {
            console.error('Login failed:', error);
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };

    const register = async (userData: any) => {
        try {
            const response = await api.post('/auth/register', userData);
            const { user: newUser, token } = response.data;

            // Store token and user data in localStorage
            storage.set(JWT_TOKEN_KEY, token);
            storage.set(USER_DATA_KEY, newUser);
            setUser(newUser);
        } catch (error: any) {
            console.error('Registration failed:', error);
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
    };

    const logout = async () => {
        storage.clear();
        setUser(null);
        window.location.href = '/login';
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};