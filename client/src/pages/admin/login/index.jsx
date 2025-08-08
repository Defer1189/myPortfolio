// myPortfolio/client/src/pages/admin/login/index.jsx
import React, { useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Navigate, Link } from 'react-router-dom';

import './LoginPage.css';

import LoginForm from '../../../components/auth/LoginForm.jsx';
import StateFeedback from '../../../components/common/StateFeedback.jsx';
import useAuth from '../../../hooks/auth/useAuth.js';

/**
 * Componente de redirección para usuarios ya autenticados
 *
 * @returns {React.ReactElement} Redirección al dashboard de administración
 */
function AuthenticatedRedirect() {
    return <Navigate to='/admin/dashboard' replace />;
}

/**
 * Componente para mostrar el estado de carga mientras se verifica la autenticación
 *
 * @returns {React.ReactElement} Indicador de carga
 */
function LoadingState() {
    return (
        <div className='login-page loading-state'>
            <StateFeedback type='loading' message='Verificando sesión...' />
        </div>
    );
}

/**
 * Página de inicio de sesión para administradores
 *
 * @returns {React.ReactElement} Componente de página de login para administradores
 */
function LoginPage() {
    const { isAuthenticated, loading } = useAuth();

    useEffect(() => {
        document.title = 'Iniciar Sesión - Panel de Administración';
        return () => {
            document.title = 'Deiby Arango - Portfolio';
        };
    }, []);

    if (isAuthenticated && !loading) {
        return <AuthenticatedRedirect />;
    }

    if (loading) {
        return <LoadingState />;
    }

    return (
        <div className='login-page'>
            <div className='login-container'>
                <Link to='/' className='back-to-home-link'>
                    <FaArrowLeft /> Volver al Inicio
                </Link>
                <div className='login-header'>
                    <h1>Panel de Administración</h1>
                    <p className='login-subheader'>Ingresa tus credenciales para acceder al panel de administración</p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
