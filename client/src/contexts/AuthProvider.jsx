// myPortfolio/client/src/contexts/AuthProvider.jsx
import PropTypes from 'prop-types';
import React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import * as authService from '../services/auth/authService.js';
import { getUser } from '../services/auth/tokenService.js';

import AuthContext from './AuthContext.jsx';

// Función de registro de utilidad para evitar el uso directo de console
const logger = {
    warn: (message, data) => {
        // eslint-disable-next-line no-console
        console.warn(message, data);
    },
    error: (message, data) => {
        // eslint-disable-next-line no-console
        console.error(message, data);
    },
    log: (message, data) => {
        // eslint-disable-next-line no-console
        console.log(message, data);
    },
};

/**
 * Lógica de validación para el formulario de login
 *
 * @param {object} formData - Los datos del formulario a validar
 * @returns {object} Objeto con los errores de validación
 */
const validateLoginForm = (formData) => {
    const errors = {};
    if (!formData.email?.trim()) {
        errors.email = 'El correo electrónico es requerido';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
        errors.email = 'Por favor, ingresa un correo electrónico válido';
    }
    if (!formData.password) {
        errors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    return errors;
};

/**
 * Custom hook para manejar el estado básico del formulario
 *
 * @returns {object} Objeto con el estado del formulario, funciones para actualizar y resetear
 */
const useFormState = () => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });
    const updateForm = useCallback((e) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({ ...prev, [name]: value }));
    }, []);
    const resetForm = useCallback(() => {
        setLoginForm({ email: '', password: '' });
    }, []);
    return {
        loginForm,
        updateForm,
        resetForm,
    };
};

/**
 * Custom hook para manejar errores del formulario
 *
 * @returns {object} Objeto con estado de errores y funciones para manipularlos
 */
const useFormErrors = () => {
    const [formErrors, setFormErrors] = useState({});
    const clearFieldError = useCallback((fieldName) => {
        setFormErrors((prev) => ({ ...prev, [fieldName]: '' }));
    }, []);
    const setErrors = useCallback((errors) => {
        setFormErrors(errors);
    }, []);
    const resetErrors = useCallback(() => {
        setFormErrors({});
    }, []);
    return {
        formErrors,
        setFormErrors,
        clearFieldError,
        setErrors,
        resetErrors,
    };
};

/**
 * Custom hook para validación del formulario
 *
 * @param {object} loginForm - Los datos del formulario a validar
 * @returns {object} Objeto con funciones de validación para todos los campos o un campo específico
 */
const useFormValidation = (loginForm) => {
    const validateAllFields = useCallback(() => {
        const errors = validateLoginForm(loginForm);
        return { errors, isValid: Object.keys(errors).length === 0 };
    }, [loginForm]);
    const validateField = useCallback(
        (fieldName) => {
            const errors = validateLoginForm(loginForm);
            return errors[fieldName] || '';
        },
        [loginForm],
    );
    return {
        validateAllFields,
        validateField,
    };
};

/**
 * Custom hook para eventos del formulario
 *
 * @param {Function} clearFieldError - Función para limpiar errores de un campo específico
 * @param {Function} validateField - Función para validar un campo específico
 * @param {Function} setFormErrors - Función para establecer errores del formulario
 * @returns {object} Objeto con funciones para manejar eventos del formulario
 */
const useFormEvents = (clearFieldError, validateField, setFormErrors) => {
    const handleBlur = useCallback(
        (e) => {
            const { name } = e.target;
            const fieldError = validateField(name);
            setFormErrors((prev) => ({ ...prev, [name]: fieldError }));
        },
        [validateField, setFormErrors],
    );
    const handleChange = useCallback(
        (e) => {
            const { name } = e.target;
            clearFieldError(name);
        },
        [clearFieldError],
    );
    return {
        handleBlur,
        handleChange,
    };
};

/**
 * Custom hook para crear callbacks del formulario de login
 *
 * @param {Function} updateForm - Función para actualizar el estado del formulario
 * @param {Function} handleChange - Función para manejar eventos de cambio en el formulario
 * @param {Function} resetForm - Función para restablecer el estado del formulario
 * @param {Function} resetErrors - Función para limpiar los errores del formulario
 * @param {Function} validateAllFields - Función para validar todos los campos del formulario
 * @param {Function} setFormErrors - Función para establecer errores en el formulario
 * @returns {object} Objeto con funciones para actualizar, resetear y validar el formulario
 */
const useFormCallbacks = (updateForm, handleChange, resetForm, resetErrors, validateAllFields, setFormErrors) => {
    const updateLoginForm = useCallback(
        (e) => {
            updateForm(e);
            handleChange(e);
        },
        [updateForm, handleChange],
    );
    const resetLoginForm = useCallback(() => {
        resetForm();
        resetErrors();
    }, [resetForm, resetErrors]);
    const validateAndSetErrors = useCallback(() => {
        const { errors, isValid } = validateAllFields();
        setFormErrors(errors);
        return isValid;
    }, [validateAllFields, setFormErrors]);
    return { updateLoginForm, resetLoginForm, validateAndSetErrors };
};

/**
 * Custom hook para manejar el estado del formulario de login con validación
 *
 * @returns {object} Objeto con estado del formulario, métodos para actualizar, validar y manejar errores
 */
const useLoginForm = () => {
    const { loginForm, updateForm, resetForm } = useFormState();
    const { formErrors, setFormErrors, clearFieldError, setErrors, resetErrors } = useFormErrors();
    const { validateAllFields, validateField } = useFormValidation(loginForm);
    const { handleBlur, handleChange } = useFormEvents(clearFieldError, validateField, setFormErrors);
    const { updateLoginForm, resetLoginForm, validateAndSetErrors } = useFormCallbacks(
        updateForm,
        handleChange,
        resetForm,
        resetErrors,
        validateAllFields,
        setFormErrors,
    );
    return {
        loginForm,
        updateLoginForm,
        resetLoginForm,
        formErrors,
        handleBlur,
        validateAllFields: validateAndSetErrors,
        setErrors,
    };
};

/**
 * Custom hook para la funcionalidad de inicio de sesión
 *
 * @param {Function} setUser - Función para actualizar el estado del usuario
 * @param {Function} setIsAuthenticated - Función para actualizar el estado de autenticación
 * @param {Function} setLoading - Función para actualizar el estado de carga
 * @param {Function} setError - Función para actualizar el estado de error
 * @returns {Function} Función de callback para realizar el inicio de sesión
 */
const useLogin = (setUser, setIsAuthenticated, setLoading, setError) => {
    return useCallback(
        async (credentials) => {
            setError(null);
            setLoading(true);
            try {
                const { user, token } = await authService.login(credentials);
                setUser(user);
                setIsAuthenticated(true);
                logger.log('Login exitoso, token recibido:', token ? 'Sí' : 'No');
                return { success: true, user };
            } catch (err) {
                logger.error('Error al iniciar sesión:', err);
                setError(err.message || 'Error al iniciar sesión');
                return { success: false, error: err.message };
            } finally {
                setLoading(false);
            }
        },
        [setUser, setIsAuthenticated, setLoading, setError],
    );
};

/**
 * Custom hook para la funcionalidad de cierre de sesión
 *
 * @param {Function} setUser - Función para actualizar el estado del usuario
 * @param {Function} setIsAuthenticated - Función para actualizar el estado de autenticación
 * @param {Function} setLoading - Función para actualizar el estado de carga
 * @returns {Function} Función de callback para realizar el cierre de sesión
 */
const useLogout = (setUser, setIsAuthenticated, setLoading) => {
    return useCallback(async () => {
        setLoading(true);
        try {
            await authService.logout();
        } catch (err) {
            logger.error('Error al cerrar sesión:', err);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            setLoading(false);
        }
    }, [setUser, setIsAuthenticated, setLoading]);
};

/**
 * Custom hook para verificar la autenticación
 *
 * @param {boolean} isAuthenticated - Estado actual de autenticación
 * @param {Function} setUser - Función para actualizar el estado del usuario
 * @param {Function} setIsAuthenticated - Función para actualizar el estado de autenticación
 * @returns {Function} Función que verifica la autenticación y devuelve un booleano
 */
const useAuthCheck = (isAuthenticated, setUser, setIsAuthenticated) => {
    return useCallback(async () => {
        if (!isAuthenticated) {
            return false;
        }
        try {
            const { user: freshUser } = await authService.checkAuth();
            setUser(freshUser);
            return true;
        } catch (err) {
            logger.error('Error al verificar autenticación:', err);
            setUser(null);
            setIsAuthenticated(false);
            return false;
        }
    }, [isAuthenticated, setUser, setIsAuthenticated]);
};

/**
 * Custom hook para operaciones de autenticación
 *
 * @returns {object} Objeto con estado de autenticación y funciones relacionadas
 */
const useAuthOperations = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const login = useLogin(setUser, setIsAuthenticated, setLoading, setError);
    const logout = useLogout(setUser, setIsAuthenticated, setLoading);
    const checkAuth = useAuthCheck(isAuthenticated, setUser, setIsAuthenticated);
    const clearError = useCallback(() => {
        setError(null);
    }, []);
    return {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        error,
        setError,
        login,
        logout,
        checkAuth,
        clearError,
    };
};

/**
 * Custom hook para inicializar la autenticación
 *
 * @param {Function} setUser - Función para actualizar el estado del usuario
 * @param {Function} setIsAuthenticated - Función para actualizar el estado de autenticación
 * @param {Function} setLoading - Función para actualizar el estado de carga
 */
const useInitAuth = (setUser, setIsAuthenticated, setLoading) => {
    useEffect(() => {
        const initAuth = async () => {
            try {
                setLoading(true);
                const storedUser = getUser();
                if (storedUser) {
                    try {
                        const { user: freshUser } = await authService.checkAuth();
                        setUser(freshUser);
                        setIsAuthenticated(true);
                    } catch (err) {
                        logger.warn('Token inválido o expirado:', err.message);
                    }
                }
            } catch (err) {
                logger.error('Error al inicializar autenticación:', err);
            } finally {
                setLoading(false);
            }
        };
        initAuth();
    }, [setLoading, setIsAuthenticated, setUser]);
};

/**
 * Custom hook para crear valores de autenticación del contexto
 *
 * @param {object} auth - Objeto con estados y funciones de autenticación
 * @returns {object} Objeto con valores de autenticación para el contexto
 */
const useAuthValues = (auth) => {
    const { user, isAuthenticated, loading, error, login, logout, checkAuth, clearError } = auth;
    return useMemo(
        () => ({
            // Estado de autenticación
            isAuthenticated,
            user,
            loading,
            error,
            // Métodos de autenticación
            login,
            logout,
            checkAuth,
            clearError,
        }),
        [isAuthenticated, user, loading, error, login, logout, checkAuth, clearError],
    );
};

/**
 * Custom hook para crear valores del formulario del contexto
 *
 * @param {object} formHandlers - Objeto con manejadores y estado del formulario
 * @returns {object} Objeto con valores del formulario para el contexto
 */
const useFormValues = (formHandlers) => {
    const { loginForm, updateLoginForm, resetLoginForm, formErrors, handleBlur, validateAllFields, setErrors } =
        formHandlers;
    return useMemo(
        () => ({
            loginForm,
            updateLoginForm,
            resetLoginForm,
            formErrors,
            handleBlur,
            validateAllFields,
            setErrors,
        }),
        [loginForm, updateLoginForm, resetLoginForm, formErrors, handleBlur, validateAllFields, setErrors],
    );
};

/**
 * Custom hook para crear el valor del contexto de autenticación
 *
 * @param {object} auth - Objeto con estados y funciones de autenticación
 * @param {object} formHandlers - Objeto con manejadores y estado del formulario
 * @returns {object} Objeto combinado con valores de autenticación y formulario para el contexto
 */
const useAuthContextValue = (auth, formHandlers) => {
    const authValues = useAuthValues(auth);
    const formValues = useFormValues(formHandlers);
    return useMemo(() => ({ ...authValues, ...formValues }), [authValues, formValues]);
};

/**
 * Proveedor del contexto de autenticación
 * Gestiona el estado de autenticación y proporciona métodos para iniciar/cerrar sesión
 *
 * @param {object} root0 - Props del componente
 * @param {React.ReactNode} root0.children - Componentes hijos
 * @returns {React.ReactElement} Componente proveedor de contexto
 */
const AuthProvider = ({ children }) => {
    const auth = useAuthOperations();
    const formHandlers = useLoginForm();
    useInitAuth(auth.setUser, auth.setIsAuthenticated, auth.setLoading);
    const contextValue = useAuthContextValue(auth, formHandlers);
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
