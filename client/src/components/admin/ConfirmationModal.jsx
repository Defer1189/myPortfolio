// myPortfolio/client/src/components/admin/ConfirmationModal.jsx
import PropTypes from 'prop-types';
import React from 'react';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';

import './ConfirmationModal.css';

/**
 * Componente del header del modal
 *
 * @param {object} param0 - Props del componente
 * @param {string} param0.title - Título del modal
 * @param {Function} param0.onCancel - Función a ejecutar al cancelar
 * @returns {React.ReactElement} El componente del header del modal
 */
const ModalHeader = ({ title, onCancel }) => (
    <div className='confirmation-modal__header'>
        <div className='confirmation-modal__icon'>
            <FaExclamationTriangle />
        </div>
        <h2 id='confirmation-title' className='confirmation-modal__title'>
            {title}
        </h2>
        <button className='confirmation-modal__close' onClick={onCancel} aria-label='Cerrar modal'>
            <FaTimes />
        </button>
    </div>
);
ModalHeader.propTypes = {
    title: PropTypes.string.isRequired,
    onCancel: PropTypes.func.isRequired,
};

/**
 * Componente del cuerpo del modal
 *
 * @param {object} param0 - Props del componente
 * @param {string} param0.message - Mensaje del modal
 * @returns {React.ReactElement} El componente del cuerpo del modal
 */
const ModalBody = ({ message }) => (
    <div className='confirmation-modal__body'>
        <p className='confirmation-modal__message'>{message}</p>
    </div>
);
ModalBody.propTypes = {
    message: PropTypes.string.isRequired,
};

/**
 * Componente de las acciones del modal
 *
 * @param {object} param0 - Props del componente
 * @param {string} param0.confirmText - Texto del botón de confirmación
 * @param {string} param0.cancelText - Texto del botón de cancelación
 * @param {Function} param0.onConfirm - Función a ejecutar al confirmar
 * @param {Function} param0.onCancel - Función a ejecutar al cancelar
 * @returns {React.ReactElement} El componente de las acciones del modal
 */
const ModalActions = ({ confirmText, cancelText, onConfirm, onCancel }) => (
    <div className='confirmation-modal__actions'>
        <button className='confirmation-modal__button confirmation-modal__button--cancel' onClick={onCancel}>
            {cancelText}
        </button>
        <button className='confirmation-modal__button confirmation-modal__button--confirm' onClick={onConfirm}>
            {confirmText}
        </button>
    </div>
);
ModalActions.propTypes = {
    confirmText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

/**
 * Modal de confirmación reutilizable
 *
 * @param {object} param0 - Props del componente
 * @param {boolean} param0.isOpen - Si el modal está abierto
 * @param {string} param0.title - Título del modal
 * @param {string} param0.message - Mensaje del modal
 * @param {string} param0.confirmText - Texto del botón de confirmación
 * @param {string} param0.cancelText - Texto del botón de cancelación
 * @param {Function} param0.onConfirm - Función a ejecutar al confirmar
 * @param {Function} param0.onCancel - Función a ejecutar al cancelar
 * @param {string} param0.type - Tipo de modal (danger, warning, info)
 * @returns {React.ReactElement|null} El componente modal o null si no está abierto
 */
function ConfirmationModal({ isOpen, title, message, confirmText, cancelText, onConfirm, onCancel, type = 'danger' }) {
    if (!isOpen) {
        return null;
    }
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };
    return (
        <div
            className='confirmation-modal-backdrop'
            onClick={handleBackdropClick}
            role='dialog'
            aria-modal='true'
            aria-labelledby='confirmation-title'
        >
            <div className={`confirmation-modal confirmation-modal--${type}`}>
                <ModalHeader title={title} onCancel={onCancel} />
                <ModalBody message={message} />
                <ModalActions
                    confirmText={confirmText}
                    cancelText={cancelText}
                    onConfirm={onConfirm}
                    onCancel={onCancel}
                />
            </div>
        </div>
    );
}
ConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['danger', 'warning', 'info']),
};

export default ConfirmationModal;
