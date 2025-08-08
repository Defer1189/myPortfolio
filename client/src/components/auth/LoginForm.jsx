// myPortfolio/client/src/components/auth/LoginForm.jsx
import PropTypes from 'prop-types';
import React from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import './LoginForm.css';

import useAuth from '../../hooks/auth/useAuth.js';
import FormInput from '../common/FormInput.jsx';
import StateFeedback from '../common/StateFeedback.jsx';

/**
 * Componente que renderiza un campo de email con icono
 *
 * @param {object} props - Propiedades del componente
 * @param {string} props.value - Valor actual del campo email
 * @param {string} [props.error] - Mensaje de error de validación
 * @param {boolean} props.isLoading - Estado de carga del formulario
 * @param {Function} props.handleChange - Función para manejar cambios en el input
 * @param {Function} props.handleBlur - Función para manejar el evento onBlur
 * @returns {React.ReactElement} Elemento JSX del campo de email con icono
 */
const EmailField = ({ value, error, isLoading, handleChange, handleBlur }) => (
    <div className='login-form-field'>
        <div className='login-form-icon'>
            <FaUser />
        </div>
        <FormInput
            id='email'
            name='email'
            type='email'
            label='Correo Electrónico'
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={error}
            disabled={isLoading}
            placeholder='Ej: ejemplo@correo.com'
        />
    </div>
);

EmailField.propTypes = {
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
};

/**
 * Componente que renderiza un campo de contraseña con icono
 *
 * @param {object} props - Propiedades del componente
 * @param {string} props.value - Valor actual del campo contraseña
 * @param {string} [props.error] - Mensaje de error de validación
 * @param {boolean} props.isLoading - Estado de carga del formulario
 * @param {Function} props.handleChange - Función para manejar cambios en el input
 * @param {Function} props.handleBlur - Función para manejar el evento onBlur
 * @returns {React.ReactElement} Elemento JSX del campo de contraseña con icono
 */
const PasswordField = ({ value, error, isLoading, handleChange, handleBlur }) => (
    <div className='login-form-field'>
        <div className='login-form-icon'>
            <FaLock />
        </div>
        <FormInput
            id='password'
            name='password'
            type='password'
            label='Contraseña'
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            error={error}
            disabled={isLoading}
        />
    </div>
);

PasswordField.propTypes = {
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
};

/**
 * Componente que renderiza el contenido del formulario de login
 *
 * @param {object} props - Propiedades del componente
 * @param {object} props.formData - Datos del formulario (email, password)
 * @param {object} props.errors - Errores de validación por campo
 * @param {boolean} props.isLoading - Estado de carga del formulario
 * @param {string} [props.authError] - Error de autenticación del servidor
 * @param {Function} props.handleChange - Función para manejar cambios en los inputs
 * @param {Function} props.handleBlur - Función para manejar el evento onBlur
 * @returns {React.ReactElement} Contenido JSX del formulario de login
 */
const LoginFormContent = ({ formData, errors, isLoading, authError, handleChange, handleBlur }) => (
    <>
        <h2 className='login-title'>Iniciar Sesión</h2>
        <EmailField
            value={formData.email}
            error={errors.email}
            isLoading={isLoading}
            handleChange={handleChange}
            handleBlur={handleBlur}
        />
        <PasswordField
            value={formData.password}
            error={errors.password}
            isLoading={isLoading}
            handleChange={handleChange}
            handleBlur={handleBlur}
        />
        {authError && <StateFeedback type='error' message={authError} />}
        <button type='submit' className='login-button' disabled={isLoading} aria-busy={isLoading} aria-live='polite'>
            {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
        </button>
    </>
);

LoginFormContent.propTypes = {
    formData: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    authError: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
};

/**
 * Valida el formulario de login
 *
 * @param {Function} validateAllFields - Función para validar todos los campos
 * @returns {boolean} - Indica si la validación fue exitosa
 */
const validateLoginForm = (validateAllFields) => {
    return validateAllFields();
};

/**
 * Procesa el intento de inicio de sesión
 *
 * @param {object} loginParams - Parámetros para el inicio de sesión
 * @param {object} loginParams.loginForm - Datos del formulario de login
 * @param {Function} loginParams.login - Función para realizar el login
 * @param {Function} loginParams.resetLoginForm - Función para reiniciar el formulario
 * @param {Function} loginParams.navigate - Función para navegar entre rutas
 * @returns {Promise<boolean>} - Indica si el login fue exitoso
 */
const processLoginAttempt = async ({ loginForm, login, resetLoginForm, navigate }) => {
    try {
        const result = await login(loginForm);
        if (result?.success) {
            resetLoginForm();
            navigate('/admin/dashboard');
            return true;
        }
        return false;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Login error:', error);
        return false;
    }
};

/**
 * Hook personalizado para gestionar el estado del formulario de login
 *
 * @returns {object} Estado y manejadores para el formulario de login
 */
const useLoginFormState = () => {
    const authData = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { loginForm, loading: isLoading, validateAllFields, clearError, setErrors } = authData;
        if (isLoading) {
            return;
        }
        clearError();
        setErrors({});
        if (!validateLoginForm(validateAllFields)) {
            return;
        }
        await processLoginAttempt({
            loginForm,
            login: authData.login,
            resetLoginForm: authData.resetLoginForm,
            navigate,
        });
    };
    return {
        ...authData,
        handleSubmit,
    };
};

/**
 * Componente principal de formulario de login
 * Renderiza el formulario de autenticación de usuarios
 *
 * @returns {React.ReactElement} Formulario completo de login
 */
function LoginForm() {
    const {
        loginForm,
        formErrors,
        loading: isLoading,
        error: authError,
        updateLoginForm,
        handleBlur,
        handleSubmit,
    } = useLoginFormState();
    return (
        <form className='login-form' onSubmit={handleSubmit} noValidate>
            <LoginFormContent
                formData={loginForm}
                errors={formErrors}
                isLoading={isLoading}
                authError={authError}
                handleChange={updateLoginForm}
                handleBlur={handleBlur}
            />
        </form>
    );
}

export default LoginForm;
