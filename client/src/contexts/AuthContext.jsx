// myPortfolio/client/src/contexts/AuthContext.jsx
import React, { createContext } from 'react';

/**
 * Contexto para la autenticación de usuarios
 *
 * @type {React.Context}
 */
const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
    login: async () => {},
    logout: async () => {},
    checkAuth: async () => {},
    loginForm: {
        email: '',
        password: '',
    },
    updateLoginForm: () => {},
    resetLoginForm: () => {},
});

export default AuthContext;
