// myPortfolio/server/src/models/Project.js
import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - shortDescription
 *         - longDescription
 *         - technologies
 *         - imageUrl
 *         - githubUrl
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *           description: ID único del proyecto.
 *         title:
 *           type: string
 *           description: Título del proyecto.
 *           minLength: 3
 *           maxLength: 150
 *           example: "Plataforma de Gestión de Contenidos"
 *         shortDescription:
 *           type: string
 *           description: Descripción breve del proyecto para listas o tarjetas.
 *           minLength: 10
 *           maxLength: 300
 *           example: "Sistema CMS robusto para administración de sitios web."
 *         longDescription:
 *           type: string
 *           description: Descripción detallada del proyecto.
 *           minLength: 50
 *           maxLength: 5000
 *           example: "Desarrollé un sistema de gestión de contenidos completo..."
 *         technologies:
 *           type: array
 *           items:
 *             type: string
 *             description: ID de la tecnología (Skill)
 *           description: Lista de IDs de tecnologías utilizadas (referencia a Skill).
 *           example: ["60f7c2b8e1b1c8a1b8e1b1c8", "60f7c2b8e1b1c8a1b8e1b1c9"]
 *         imageUrl:
 *           type: string
 *           format: uri
 *           description: URL de la imagen principal del proyecto.
 *           example: ""
 *         liveDemoUrl:
 *           type: string
 *           format: uri
 *           description: URL a una demo en vivo del proyecto (opcional, puede estar vacío).
 *           example: "https://demo.cms-project.com"
 *         githubUrl:
 *           type: string
 *           format: uri
 *           description: URL al repositorio de GitHub del proyecto.
 *           example: "https://github.com/usuario/proyecto"
 *         order:
 *           type: integer
 *           description: Orden de visualización (por defecto 999).
 *           example: 1
 *         isFeatured:
 *           type: boolean
 *           description: Indica si el proyecto es destacado (por defecto false).
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Fecha de creación del proyecto.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Fecha de última actualización.
 */
const ProjectSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'El título del proyecto es requerido'],
            trim: true,
            minlength: 3,
            maxlength: 150,
        },
        shortDescription: {
            type: String,
            required: [true, 'La descripción corta es requerida'],
            trim: true,
            minlength: 10,
            maxlength: 300,
        },
        longDescription: {
            type: String,
            required: [true, 'La descripción larga es requerida'],
            trim: true,
            minlength: 50,
            maxlength: 5000,
        },
        technologies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Skill',
                required: true,
            },
        ],
        imageUrl: {
            type: String,
            required: [true, 'La URL de la imagen es requerida'],
            trim: true,
            match: [/^https?:\/\/.+\..+$/, 'Por favor, ingresa una URL de imagen válida'],
        },
        liveDemoUrl: {
            type: String,
            trim: true,
            match: [/^$|^https?:\/\/.+\..+$/, 'Por favor, ingresa una URL de demo válida o vacía'],
            default: '',
        },
        githubUrl: {
            type: String,
            required: [true, 'La URL de GitHub es requerida'],
            trim: true,
            match: [/^https?:\/\/.+\..+$/, 'Por favor, ingresa una URL de GitHub válida'],
        },
        order: {
            type: Number,
            default: 999,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true, versionKey: false },
);

const Project = model('Project', ProjectSchema);
export default Project;
