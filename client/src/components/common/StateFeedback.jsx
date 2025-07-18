// myPortfolio/client/src/components/common/StateFeedback.jsx
import PropTypes from 'prop-types';
import React from 'react';

import '../../styles/StateFeedback.css';

const STATE_CONFIG = {
    loading: {
        icon: <div className='spinner'></div>,
        text: 'Cargando...',
        className: 'loading-state',
        role: 'status',
        ariaLive: 'polite',
    },
    error: {
        icon: <span className='icon'>❌</span>,
        text: 'Se produjo un error',
        className: 'error-state',
        role: 'alert',
        ariaLive: 'assertive',
    },
    empty: {
        icon: <span className='icon'>📭</span>,
        text: 'No se encontraron datos',
        className: 'empty-state',
        role: 'status',
        ariaLive: 'polite',
    },
};

/**
 * Renderiza un componente de feedback para estados de carga, error o vacío.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {'loading'|'error'|'empty'} props.type - Tipo de estado (loading|error|empty).
 * @param {string} [props.message] - Mensaje a mostrar (opcional).
 * @param {React.ReactElement} [props.loadingIcon] - Icono para el estado de carga.
 * @param {React.ReactElement} [props.errorIcon] - Icono para el estado de error.
 * @param {React.ReactElement} [props.emptyIcon] - Icono para el estado vacío.
 * @returns {React.JSX.Element} Componente de feedback.
 */
const StateFeedback = ({ type, message, loadingIcon, errorIcon, emptyIcon }) => {
    // Usar una copia mutable si se necesita modificar los valores por defecto
    const config = { ...STATE_CONFIG[type] };

    // Sobrescribir iconos y mensajes si se proporcionan
    if (loadingIcon && type === 'loading') {
        config.icon = loadingIcon;
    }
    if (errorIcon && type === 'error') {
        config.icon = errorIcon;
    }
    if (emptyIcon && type === 'empty') {
        config.icon = emptyIcon;
    }
    if (message) {
        config.text = message;
    }

    // Si el tipo no coincide con ninguna configuración, no renderizar nada.
    if (!config || !type) {
        return null;
    }

    return (
        <div className={`state-feedback ${config.className}`} aria-live={config.ariaLive} role={config.role}>
            {config.icon}
            <p>{config.text}</p>
        </div>
    );
};

StateFeedback.propTypes = {
    type: PropTypes.oneOf(['loading', 'error', 'empty']).isRequired,
    message: PropTypes.string,
    loadingIcon: PropTypes.element,
    errorIcon: PropTypes.element,
    emptyIcon: PropTypes.element,
};

export default StateFeedback;
