// myPortfolio/server/src/controllers/contact.controller.js
import Message from '../models/Message.js';

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

        // Validación de presencia de datos
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Todos los campos son requeridos.' });
        }

        const newMessage = new Message({
            name,
            email,
            message,
        });

        await newMessage.save();

        res.status(201).json({ message: 'Mensaje enviado exitosamente. ¡Gracias por contactarme!', data: newMessage });
    } catch (error) {
        // Manejo de errores de validación de Mongoose
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ error: 'Error de validación', details: errors });
        }
        // Errores generales del servidor
        res.status(500).json({ error: 'Error interno del servidor', details: error.message });
    }
};

export { handleContactForm };
