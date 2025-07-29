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
 *         _id:
 *           type: string
 *           readOnly: true
 *           description: ID único generado automáticamente.
 *           example: "6624a7d9a8d4c3a9c8f7b1a2"
 *         name:
 *           type: string
 *           description: Nombre completo del remitente.
 *           example: "Juan Pérez"
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico válido.
 *           example: "juan.perez@ejemplo.com"
 *         message:
 *           type: string
 *           description: Contenido del mensaje (10-500 caracteres).
 *           example: "Me interesa colaborar en un proyecto de desarrollo web."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Fecha/hora de creación (generado automáticamente).
 *           example: "2025-06-07T14:30:15.123Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Fecha/hora de última actualización (generado automáticamente).
 *           example: "2025-06-07T14:35:22.456Z"
 */
const MessageSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre completo es requerido'],
            trim: true,
            minlength: [2, 'El nombre debe tener mínimo 2 caracteres'],
            maxlength: [50, 'El nombre no puede exceder 50 caracteres'],
        },
        email: {
            type: String,
            required: [true, 'El correo electrónico es requerido'],
            trim: true,
            lowercase: true,
            maxlength: [254, 'El email no puede exceder 254 caracteres'],
            match: [
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                'Por favor, ingresa un correo electrónico válido',
            ],
        },
        message: {
            type: String,
            required: [true, 'El contenido del mensaje es requerido'],
            trim: true,
            minlength: [10, 'El mensaje debe tener mínimo 10 caracteres'],
            maxlength: [500, 'El mensaje no puede exceder 500 caracteres'],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const Message = model('Message', MessageSchema);
export default Message;
