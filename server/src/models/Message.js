// myPortfolio/server/src/models/Message.js
import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - message
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del remitente.
 *           example: "Juan Pérez"
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del remitente.
 *           example: "juan.perez@example.com"
 *         message:
 *           type: string
 *           description: Contenido del mensaje.
 *           example: "Me gustaría contactarte para una oportunidad de trabajo."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de creación del mensaje (generado automáticamente).
 *           example: "2025-06-07T12:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de la última actualización (generado automáticamente).
 *           example: "2025-06-07T12:00:00.000Z"
 */
const MessageSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre es requerido'],
            trim: true,
            minLength: [2, 'El nombre debe tener al menos 2 caracteres.'],
            maxlength: [50, 'El nombre no puede exceder los 50 caracteres'],
        },
        email: {
            type: String,
            required: [true, 'El correo electrónico es requerido'],
            trim: true,
            lowercase: true,
            match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingresa un correo electrónico válido'],
        },
        message: {
            type: String,
            required: [true, 'El mensaje es requerido'],
            trim: true,
            minlength: [10, 'El mensaje debe tener al menos 10 caracteres'],
            maxlength: [500, 'El mensaje no puede exceder los 500 caracteres'],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const Message = model('Message', MessageSchema);

export default Message;
