// myPortfolio/client/src/pages/common/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

import StateFeedback from '../../components/common/StateFeedback.jsx';
/**
 * Componente de la página Not Found (404).
 * Muestra un mensaje de error y un enlace para volver a la página principal.
 *
 * @returns {React.ReactElement} El componente NotFoundPage renderizado.
 */
const NotFoundPage = () => {
    return (
        <div className='not-found-page text-center p-lg'>
            <StateFeedback type='error' message='Error 404: Página no encontrada' />

            <p className='m-md'>Lo sentimos, la página que estás buscando no existe.</p>

            <Link to='/' className='button-primary'>
                Volver al inicio
            </Link>
        </div>
    );
};

export default NotFoundPage;
