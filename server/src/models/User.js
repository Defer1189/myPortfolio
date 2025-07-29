// myPortfolio/server/src/models/User.js
import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - title
 *         - bio
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *           description: ID único del usuario.
 *         name:
 *           type: string
 *           description: Nombre completo del usuario (2-100 caracteres).
 *           minLength: 2
 *           maxLength: 100
 *           example: "Deiby Arango"
 *         title:
 *           type: string
 *           description: Título profesional (máx. 100 caracteres).
 *           maxLength: 100
 *           example: "Full-stack Developer"
 *         bio:
 *           type: string
 *           description: Biografía personal (50-1000 caracteres).
 *           minLength: 50
 *           maxLength: 1000
 *           example: "Apasionado por la creación de soluciones web robustas y escalables..."
 *         profilePicture:
 *           type: string
 *           format: url
 *           description: URL de la imagen de perfil (opcional, puede estar vacío).
 *           example: ""
 *         featuredSkills:
 *           type: array
 *           description: Lista de IDs de habilidades destacadas.
 *           items:
 *             type: string
 *             description: ID de la habilidad (referencia a Skill).
 *             example: "60d0fe4f5311236168a109ca"
 *         socialLinks:
 *           type: array
 *           description: Enlaces a redes sociales.
 *           items:
 *             type: object
 *             required:
 *               - platform
 *               - url
 *             properties:
 *               platform:
 *                 type: string
 *                 description: Nombre de la plataforma (2-30 caracteres).
 *                 minLength: 2
 *                 maxLength: 30
 *                 example: "LinkedIn"
 *               url:
 *                 type: string
 *                 format: url
 *                 description: URL del perfil (debe ser válida).
 *                 example: "https://linkedin.com/in/deibyarango"
 *       example:
 *         name: "Deiby Arango"
 *         title: "Full-stack Developer"
 *         bio: "Apasionado por la creación de soluciones web robustas y escalables, con enfoque en rendimiento y experiencia de usuario. Siempre aprendiendo nuevas tecnologías y compartiendo conocimiento."
 *         profilePicture: ""
 *         featuredSkills:
 *           - "60d0fe4f5311236168a109ca"
 *           - "60d0fe4f5311236168a109cb"
 *         socialLinks:
 *           - platform: "LinkedIn"
 *             url: "https://linkedin.com/in/deibyarango"
 *           - platform: "GitHub"
 *             url: "https://github.com/deibyarango"
 */
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre del usuario es requerido'],
            trim: true,
            minlength: [2, 'El nombre debe tener al menos 2 caracteres'],
            maxlength: [100, 'El nombre no puede exceder los 100 caracteres'],
        },
        title: {
            type: String,
            required: [true, 'El título profesional es requerido'],
            trim: true,
            maxlength: [100, 'El título no puede exceder los 100 caracteres'],
        },
        bio: {
            type: String,
            required: [true, 'La biografía es requerida'],
            trim: true,
            minlength: [50, 'La biografía debe tener al menos 50 caracteres'],
            maxlength: [1000, 'La biografía no puede exceder los 1000 caracteres'],
        },
        profilePicture: {
            type: String,
            trim: true,
            default: '',
            match: [/^$|^https?:\/\/.+\..+$/, 'Por favor, ingresa una URL de imagen válida o vacía'],
        },
        featuredSkills: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Skill',
            },
        ],
        socialLinks: [
            {
                platform: {
                    type: String,
                    required: [true, 'La plataforma es requerida'],
                    trim: true,
                    minlength: 2,
                    maxlength: 30,
                },
                url: {
                    type: String,
                    required: [true, 'La URL es requerida'],
                    trim: true,
                    match: [/^https?:\/\/.+\..+$/, 'Por favor, ingresa una URL válida'],
                },
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

const User = model('User', UserSchema);
export default User;
