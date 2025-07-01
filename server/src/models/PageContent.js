// myPortfolio/server/src/models/PageContent.js
import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     PageContent:
 *       type: object
 *       properties:
 *         pageName:
 *           type: string
 *           description: Nombre único de la página (ej. "contact", "about").
 *           example: "contact"
 *         title:
 *           type: string
 *           description: Título principal de la sección.
 *           example: "Contáctame"
 *         introduction:
 *           type: string
 *           description: Párrafo introductorio de la sección (opcional si usas sections).
 *           example: "¡Estoy siempre abierto a nuevas oportunidades..."
 *         sections:
 *           type: array
 *           description: Lista de bloques de contenido personalizados por página.
 *           items:
 *             type: object
 *             properties:
 *               sectionTitle:
 *                 type: string
 *                 description: Título de la subsección.
 *                 example: "Mi historia"
 *               text:
 *                 type: string
 *                 description: Texto de la sección.
 *                 example: "Desde joven me apasiona la tecnología..."
 *               image:
 *                 type: string
 *                 format: uri
 *                 description: URL de la imagen asociada.
 *                 example: "https://cdn.misitio.com/img.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización.
 */
const PageContentSchema = new Schema(
    {
        pageName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: /^[a-z-]+$/,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        introduction: {
            type: String,
            trim: true,
        },
        sections: [
            {
                sectionTitle: { type: String, required: true, trim: true },
                text: { type: String, required: true, trim: true },
                image: { type: String, trim: true },
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
