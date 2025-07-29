// myPortfolio/server/src/models/PageContent.js
import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     PageContent:
 *       type: object
 *       required:
 *         - pageName
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *           description: ID único generado automáticamente.
 *           example: "6624a7d9a8d4c3a9c8f7b1a2"
 *         pageName:
 *           type: string
 *           description: |
 *             Nombre único de la página (solo letras minúsculas y guiones).
 *             Ejemplos: "contact", "about", "home".
 *           example: "contact"
 *         title:
 *           type: string
 *           description: Título principal de la sección (máx. 100 caracteres).
 *           example: "Contáctame"
 *         introduction:
 *           type: string
 *           description: Párrafo introductorio (opcional, máx. 1000 caracteres).
 *           example: "¡Estoy siempre abierto a nuevas oportunidades..."
 *         sections:
 *           type: array
 *           description: Bloques de contenido personalizados.
 *           items:
 *             type: object
 *             required:
 *               - sectionTitle
 *               - text
 *             properties:
 *               sectionTitle:
 *                 type: string
 *                 description: Título de la subsección (máx. 100 caracteres).
 *                 example: "Mi historia"
 *               text:
 *                 type: string
 *                 description: Texto de la sección (máx. 5000 caracteres).
 *                 example: "Desde joven me apasiona la tecnología..."
 *               image:
 *                 type: string
 *                 format: url
 *                 description: URL de imagen asociada (opcional).
 *                 example: "https://cdn.misitio.com/img.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Fecha de creación (automática).
 *           example: "2025-06-07T14:30:15.123Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Fecha de última actualización (automática).
 *           example: "2025-06-07T14:35:22.456Z"
 */
const PageContentSchema = new Schema(
    {
        pageName: {
            type: String,
            required: [true, 'El nombre de la página es requerido'],
            unique: true,
            trim: true,
            lowercase: true,
            minlength: [3, 'El nombre de página debe tener mínimo 3 caracteres'],
            maxlength: [50, 'El nombre de página no puede exceder 50 caracteres'],
            match: [/^[a-z-]+$/, 'El nombre solo puede contener letras minúsculas y guiones'],
        },
        title: {
            type: String,
            required: [true, 'El título es requerido'],
            trim: true,
            maxlength: [100, 'El título no puede exceder 100 caracteres'],
        },
        introduction: {
            type: String,
            trim: true,
            maxlength: [1000, 'La introducción no puede exceder 1000 caracteres'],
        },
        sections: [
            {
                sectionTitle: {
                    type: String,
                    required: [true, 'El título de sección es requerido'],
                    trim: true,
                    maxlength: [100, 'El título de sección no puede exceder 100 caracteres'],
                },
                text: {
                    type: String,
                    required: [true, 'El contenido de la sección es requerido'],
                    trim: true,
                    maxlength: [5000, 'El contenido no puede exceder 5000 caracteres'],
                },
                image: {
                    type: String,
                    trim: true,
                    match: [/^$|^https?:\/\/.+\..+$/, 'Por favor, ingresa una URL de imagen válida o vacía'],
                    default: '',
                },
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const PageContent = model('PageContent', PageContentSchema);
export default PageContent;
