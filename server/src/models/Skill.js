// myPortfolio/server/src/models/Skill.js
import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Skill:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - level
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *           description: ID único de la habilidad.
 *         name:
 *           type: string
 *           description: Nombre de la habilidad (ej. JavaScript, React).
 *           example: "JavaScript"
 *         category:
 *           type: string
 *           description: Categoría de la habilidad (Frontend, Backend, etc.).
 *           example: "Frontend"
 *         iconUrl:
 *           type: string
 *           format: url
 *           description: URL del icono de la habilidad (opcional).
 *           example: "https://cdn.jsdelivr.net/npm/simple-icons/icons/javascript.svg"
 *         level:
 *           type: string
 *           enum: [Básico, Intermedio, Avanzado, Experto]
 *           description: Nivel de dominio de la habilidad.
 *           example: "Experto"
 *         order:
 *           type: number
 *           description: Orden de visualización de la habilidad.
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Fecha de creación de la habilidad.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Fecha de última actualización.
 */
const SkillSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre de la habilidad es requerido'],
            trim: true,
            unique: true,
            minlength: 2,
            maxlength: 50,
        },
        category: {
            type: String,
            required: [true, 'La categoría de la habilidad es requerida'],
            trim: true,
            minlength: 2,
            maxlength: 50,
        },
        iconUrl: {
            type: String,
            trim: true,
            match: [/^$|^https?:\/\/.+\..+$/, 'Por favor, ingresa una URL de icono válida o vacía'],
            default: '',
        },
        level: {
            type: String,
            required: [true, 'El nivel de la habilidad es requerido'],
            enum: ['Básico', 'Intermedio', 'Avanzado', 'Experto'],
            trim: true,
        },
        order: {
            type: Number,
            default: 999,
            min: 0,
        },
    },
    { timestamps: true, versionKey: false },
);

const Skill = model('Skill', SkillSchema);
export default Skill;
