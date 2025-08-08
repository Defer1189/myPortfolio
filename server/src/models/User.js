// myPortfolio/server/src/models/User.js
import bcrypt from 'bcryptjs';
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
 *         - email
 *         - password
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
 *         email:
 *           type: string
 *           format: email
 *           description: Correo electrónico del usuario (único).
 *           example: "deiby@example.com"
 *         password:
 *           type: string
 *           format: password
 *           writeOnly: true
 *           description: Contraseña del usuario (min 8 caracteres).
 *           example: "********"
 *         role:
 *           type: string
 *           enum: [admin, editor]
 *           description: Rol del usuario en el sistema.
 *           default: editor
 *           example: "admin"
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
        email: {
            type: String,
            required: [true, 'El correo electrónico es requerido'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Por favor, ingresa un correo electrónico válido',
            ],
        },
        password: {
            type: String,
            required: [true, 'La contraseña es requerida'],
            minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
            select: false,
        },
        role: {
            type: String,
            enum: ['admin', 'editor'],
            default: 'editor',
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
            match: [
                /^$|^(https?:\/\/)?(?:[\w-]+\.?)+(?:[a-z]{2,63}|localhost)(?::\d{1,5})?(?:[/?#]\S*)?$/i,
                'Por favor, ingresa una URL de imagen válida o vacía',
            ],
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
                    match: [
                        /^(https?:\/\/)?(?:[\w-]+\.?)+(?:[a-z]{2,63}|localhost)(?::\d{1,5})?(?:[/?#]\S*)?$/i,
                        'Por favor, ingresa una URL válida',
                    ],
                },
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

// Middleware para encriptar la contraseña antes de guardar el usuario
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar la contraseña ingresada con la almacenada
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = model('User', UserSchema);
export default User;
