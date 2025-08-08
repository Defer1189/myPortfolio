// myPortfolio/client/src/hooks/auth/useAuth.js
import { useContext } from 'react';

import AuthContext from '../../contexts/AuthContext.jsx';

/**
 * Hook personalizado para acceder al contexto de autenticación
 *
 * @returns {object} El contexto de autenticación
 */
const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export default useAuth;
