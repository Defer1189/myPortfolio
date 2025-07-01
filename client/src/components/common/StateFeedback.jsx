// myPortfolio/client/src/components/common/StateFeedback.jsx
import PropTypes from 'prop-types';
import React from 'react';

import '../../styles/StateFeedback.css';

/**
 * Componente reutilizable para mostrar estados de carga, error o vacío
 *
 * @param {object} props - Las propiedades del componente.
 * @param {'loading'|'error'|'empty'} props.type - Tipo de estado (loading|error|empty).
 * @param {string} [props.message] - Mensaje a mostrar (opcional).
 * @returns {React.ReactElement} Componente de feedback
 */
const StateFeedback = ({ type, message }) => {
    const getContent = () => {
        switch (type) {
            case 'loading':
                return (
                    <div className='state-feedback loading-state'>
                        <div className='spinner'></div>
                        <p>{message || 'Cargando...'}</p>
                    </div>
                );
            case 'error':
                return (
                    <div className='state-feedback error-state'>
                        <span className='icon'>❌</span>
                        <p>{message || 'Se produjo un error'}</p>
                    </div>
                );
            case 'empty':
                return (
                    <div className='state-feedback empty-state'>
                        <span className='icon'>📭</span>
                        <p>{message || 'No se encontraron datos'}</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return getContent();
};

StateFeedback.propTypes = {
    type: PropTypes.oneOf(['loading', 'error', 'empty']).isRequired,
    message: PropTypes.string,
};

export default StateFeedback;
