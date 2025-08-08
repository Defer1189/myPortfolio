// myPortfolio/client/src/components/common/ProtectedRoute.jsx
import PropTypes from 'prop-types';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import useAuth from '../../hooks/auth/useAuth.js';

import StateFeedback from './StateFeedback.jsx';

/**
 * Componente que protege rutas que requieren autenticación.
 * Utiliza Outlet de react-router-dom para renderizar rutas anidadas.
 *
 * @param {object} props - Propiedades del componente
 * @param {string} props.redirectTo - Ruta a la que redirigir si no está autenticado
 * @returns {React.ReactNode} El Outlet o redirecciona
 */
const ProtectedRoute = ({ redirectTo = '/admin/login' }) => {
    const { isAuthenticated, loading, user } = useAuth();
    if (loading) {
        return (
            <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
                <StateFeedback type='loading' message='Verificando autenticación...' />
            </div>
        );
    }
    if (!isAuthenticated || !user) {
        return <Navigate to={redirectTo} replace />;
    }
    return <Outlet />;
};
ProtectedRoute.propTypes = {
    redirectTo: PropTypes.string,
};

export default ProtectedRoute;
