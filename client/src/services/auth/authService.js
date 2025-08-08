// myPortfolio/client/src/services/auth/authService.js
import { setToken, setRefreshToken, setUser, getToken, getRefreshToken, clearAuth } from './tokenService.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTH_ENDPOINT = `${API_BASE_URL}/api/auth`;

/**
 * Realiza la petición para iniciar sesión
 *
 * @param {object} credentials - Credenciales de usuario (email, password)
 * @returns {Promise<object>} Respuesta con datos del usuario y token
 */
export const login = async (credentials) => {
    try {
        const response = await fetch(`${AUTH_ENDPOINT}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error?.message || 'Error al iniciar sesión');
        }
        if (data.data?.token) {
            setToken(data.data.token);
        }
        if (data.data?.refreshToken) {
            setRefreshToken(data.data.refreshToken);
        }
        if (data.data?.user) {
            setUser(data.data.user);
        }
        return data.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error en authService.login:', error);
        throw error;
    }
};

/**
 * Cierra la sesión del usuario
 *
 * @returns {Promise<object>} Respuesta del servidor
 */
export const logout = async () => {
    try {
        const token = getToken();
        const response = await fetch(`${AUTH_ENDPOINT}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            credentials: 'include',
        });
        const data = await response.json();
        clearAuth();
        if (!response.ok) {
            // eslint-disable-next-line no-console
            console.warn('Error en servidor al cerrar sesión:', data.error);
        }
        return data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error en authService.logout:', error);
        clearAuth();
        throw error;
    }
};

/**
 * Verifica el estado de autenticación actual
 *
 * @returns {Promise<object>} Datos del usuario autenticado
 */
export const checkAuth = async () => {
    try {
        const token = getToken();
        if (!token) {
            throw new Error('No hay token disponible');
        }
        const response = await fetch(`${AUTH_ENDPOINT}/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) {
            clearAuth();
            throw new Error(data.error?.message || 'Sesión inválida');
        }
        if (data.data?.user) {
            setUser(data.data.user);
        }
        return data.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error en authService.checkAuth:', error);
        clearAuth();
        throw error;
    }
};

/**
 * Refresca el token de autenticación
 *
 * @returns {Promise<object>} Nuevo token
 */
export const refreshToken = async () => {
    try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
            throw new Error('No hay refresh token disponible');
        }
        const response = await fetch(`${AUTH_ENDPOINT}/refresh-token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ refresh_token: refreshToken }),
        });
        const data = await response.json();
        if (!response.ok) {
            clearAuth();
            throw new Error(data.error?.message || 'Error al refrescar token');
        }
        if (data.data?.token) {
            setToken(data.data.token);
        }
        return data.data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error en authService.refreshToken:', error);
        clearAuth();
        throw error;
    }
};
