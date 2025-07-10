// myPortfolio/server/src/controllers/contact.controller.js
import { validateContactFormInput, saveNewMessage } from '../utils/contactUtils.js';

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
 * @param {import('express').NextFunction} next - Función next para manejo de errores
 * @returns {Promise<void>}
 */
const handleContactForm = async (req, res, next) => {
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
        return res.status(201).json({
            success: true,
            message: 'Mensaje enviado exitosamente',
            data: newMessage,
        });
    } catch (error) {
        next(error);
    }
};

export { handleContactForm };
