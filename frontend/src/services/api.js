import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// API endpoints
export const authAPI = {
    /**
     * Get current user data
     */
    getUser: async () => {
        const response = await api.get('/api/auth/user');
        return response.data;
    },

    /**
     * Logout user
     */
    logout: async () => {
        const response = await api.post('/api/auth/logout');
        return response.data;
    },

    /**
     * Initiate OAuth login (redirect)
     */
    login: () => {
        window.location.href = `${API_BASE_URL}/api/auth/login`;
    },
};

export const infoAPI = {
    /**
     * Get API information
     */
    getInfo: async () => {
        const response = await api.get('/api/info');
        return response.data;
    },

    /**
     * Health check
     */
    healthCheck: async () => {
        const response = await api.get('/health');
        return response.data;
    },
};

export default api;
