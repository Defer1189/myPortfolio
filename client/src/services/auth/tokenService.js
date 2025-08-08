// myPortfolio/client/src/services/auth/tokenService.js

/**
 * Servicio para manejar tokens JWT en localStorage
 */

const TOKEN_KEY = 'portfolio_auth_token';
const REFRESH_TOKEN_KEY = 'portfolio_refresh_token';
const USER_KEY = 'portfolio_user';

/**
 * Guarda el token JWT en localStorage
 *
 * @param {string} token - Token JWT
 */
export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Obtiene el token JWT desde localStorage
 *
 * @returns {string|null} Token JWT o null si no existe
 */
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

/**
 * Elimina el token JWT de localStorage
 */
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

/**
 * Guarda el token de refresco en localStorage
 *
 * @param {string} refreshToken - Token de refresco
 */
export const setRefreshToken = (refreshToken) => {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

/**
 * Obtiene el token de refresco desde localStorage
 *
 * @returns {string|null} Token de refresco o null si no existe
 */
export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Elimina el token de refresco de localStorage
 */
export const removeRefreshToken = () => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * Guarda los datos del usuario en localStorage
 *
 * @param {object} user - Datos del usuario
 */
export const setUser = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Obtiene los datos del usuario desde localStorage
 *
 * @returns {object | null} Datos del usuario o null si no existe
 */
export const getUser = () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

/**
 * Elimina los datos del usuario de localStorage
 */
export const removeUser = () => {
    localStorage.removeItem(USER_KEY);
};

/**
 * Limpia todos los datos de autenticación de localStorage
 */
export const clearAuth = () => {
    removeToken();
    removeRefreshToken();
    removeUser();
};
