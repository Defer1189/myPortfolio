// myPortfolio/server/src/utils/contactUtils.js
import Message from '../models/Message.js';

import logger from './logger.js';

/**
 * Valida los datos de entrada del formulario de contacto.
 *
 * @param {object} data - Objeto con los datos del formulario (name, email, message).
 * @returns {string|null} - Mensaje de error si la validación falla, o null si es exitosa.
 */
const validateContactFormInput = (data) => {
    const { name, email, message } = data;
    if (!name || !email || !message) {
        logger.warn('Intento de envío de formulario de contacto con campos faltantes.', { name, email, message });
        return 'Todos los campos son requeridos.';
    }
    return null;
};

/**
 * Guarda un nuevo mensaje en la base de datos.
 *
 * @param {object} data - Objeto con los datos del mensaje (name, email, message).
 * @returns {Promise<import('../models/Message.js').default>} - El nuevo mensaje guardado.
 */
const saveNewMessage = async (data) => {
    const newMessage = new Message(data);
    await newMessage.save();
    logger.info('✅ Mensaje de contacto guardado exitosamente.', {
        messageId: newMessage._id,
        email: newMessage.email,
    });
    return newMessage;
};

/**
 * Maneja errores específicos de Mongoose (ValidationError).
 *
 * @param {Error} error - El objeto de error.
 * @returns {object|null} - Objeto con 'error' y 'details' si es un ValidationError, o null.
 */
const handleMongooseValidationError = (error) => {
    if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map((err) => err.message);
        logger.warn('Error de validación al enviar formulario de contacto.', {
            originalError: error.message,
            details: errors,
        });
        return { error: 'Error de validación', details: errors };
    }
    return null;
};

export { validateContactFormInput, saveNewMessage, handleMongooseValidationError };
