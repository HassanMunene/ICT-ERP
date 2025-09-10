import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    timeout: 120000, // 120 SECONDS (2 minutes)
    withCredentials: true, // For authenticated requests that needs cookies
});