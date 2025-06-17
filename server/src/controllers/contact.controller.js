// myPortfolio/server/src/controllers/contact.controller.js
import { validateContactFormInput, saveNewMessage, handleMongooseValidationError } from '../utils/contactUtils.js';

import logger from '../utils/logger.js';

/**
 * @typedef {object} ContactFormRequestBody
 * @property {string} name - Nombre del remitente.
 * @property {string} email - Correo electrónico del remitente.
 * @property {string} message - Contenido del mensaje.
 */
/**
 * Maneja el envío del formulario de contacto.
 * Guarda el mensaje en la base de datos.
 *
 * @param {import('express').Request<{}, {}, ContactFormRequestBody>} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
const handleContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // 1. Validación de datos de entrada
        const validationError = validateContactFormInput({ name, email, message });
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        // 2. Guardar el nuevo mensaje
        const newMessage = await saveNewMessage({ name, email, message });

        // 3. Respuesta exitosa
        res.status(201).json({ message: 'Mensaje enviado exitosamente. ¡Gracias por contactarme!', data: newMessage });
    } catch (error) {
        // 4. Manejo de errores específicos (Mongoose ValidationError)
        const validationErrResponse = handleMongooseValidationError(error);
        if (validationErrResponse) {
            return res.status(400).json(validationErrResponse);
        }

        // 5. Manejo de errores generales del servidor
        logger.error('❌ Error interno del servidor al manejar formulario de contacto.', {
            originalError: error.message,
            stack: error.stack,
        });
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};

export { handleContactForm };
