// myPortfolio/server/src/models/User.js
import { Schema, model, Types } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre completo del propietario del portafolio.
 *           example: "Deiby Arango"
 *         title:
 *           type: string
 *           description: Título o rol profesional.
 *           example: "Full-stack Developer"
 *         bio:
 *           type: string
 *           description: Pequeña biografía o descripción personal.
 *           example: "Apasionado por la creación de soluciones web robustas y escalables..."
 *         profilePicture:
 *           type: string
 *           description: URL de la imagen de perfil.
 *           example: "https://example.com/profile.jpg"
 *         socialLinks:
 *           type: array
 *           description: Enlaces a perfiles de redes sociales.
 *           items:
 *             type: object
 *             properties:
 *               platform:
 *                 type: string
 *                 example: "LinkedIn"
 *               url:
 *                 type: string
 *                 format: url
 *                 example: "https://linkedin.com/in/deibyarango"
 *         skills:
 *           type: array
 *           description: Lista de habilidades o tecnologías.
 *           items:
 *             type: string
 *             example: "JavaScript"
 *         featuredProjects:
 *           type: array
 *           description: Proyectos destacados para la página de inicio.
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 readOnly: true
 *                 description: ID único del proyecto.
 *               title:
 *                 type: string
 *                 example: "E-commerce Platform"
 *               description:
 *                 type: string
 *                 example: "Plataforma de comercio electrónico con pasarela de pago integrada."
 *               imageUrl:
 *                 type: string
 *                 format: url
 *                 example: "https://example.com/project1.jpg"
 *               projectUrl:
 *                 type: string
 *                 format: url
 *                 example: "https://github.com/deibyarango/ecommerce"
 *       example:
 *         name: "Deiby Arango"
 *         title: "Full-stack Developer"
 *         bio: "Apasionado por la creación de soluciones web robustas y escalables, con experiencia en tecnologías modernas y un enfoque en el rendimiento y la experiencia de usuario."
 *         profilePicture: "https://res.cloudinary.com/your_cloud_name/image/upload/v123456789/profile.jpg"
 *         socialLinks:
 *           - platform: "LinkedIn"
 *             url: "https://linkedin.com/in/deibyarango"
 *           - platform: "GitHub"
 *             url: "https://github.com/deibyarango"
 *         skills:
 *           - "JavaScript"
 *           - "Node.js"
 *           - "Express.js"
 *           - "React"
 *           - "MongoDB"
 *         featuredProjects:
 *           - _id: "60c72b2f9c3a4f0015b2e3d4"
 *             title: "Plataforma de Gestión de Contenidos"
 *             description: "Sistema CMS robusto para la administración de sitios web dinámicos."
 *             imageUrl: "https://res.cloudinary.com/your_cloud_name/image/upload/v123456789/cms-project.jpg"
 *             projectUrl: "https://github.com/deibyarango/cms-project"
 *           - _id: "60c72b2f9c3a4f0015b2e3d5"
 *             title: "Aplicación de Chat en Tiempo Real"
 *             description: "Aplicación de chat con websockets y autenticación de usuarios."
 *             imageUrl: "https://res.cloudinary.com/your_cloud_name/image/upload/v123456789/chat-app.jpg"
 *             projectUrl: "https://github.com/deibyarango/realtime-chat"
 */
const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'El nombre del usuario es requerido'],
            trim: true,
            minlength: [2, 'El nombre debe tener al menos 2 caracteres.'],
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
            minlength: [10, 'La biografía debe tener al menos 10 caracteres.'],
            maxlength: [1000, 'La biografía no puede exceder los 1000 caracteres'],
        },
        profilePicture: {
            type: String,
            trim: true,
            default: '',
        },
        socialLinks: [
            {
                platform: {
                    type: String,
                    required: true,
                    trim: true,
                },
                url: {
                    type: String,
                    required: true,
                    trim: true,
                    match: [/^https?:\/\/.+\..+$/, 'Por favor, ingresa una URL válida'],
                },
            },
        ],
        skills: [
            {
                type: String,
                trim: true,
            },
        ],
        featuredProjects: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    default: () => new Types.ObjectId(),
                },
                title: {
                    type: String,
                    required: true,
                    trim: true,
                },
                description: {
                    type: String,
                    required: true,
                    trim: true,
                    maxlength: [500, 'La descripción del proyecto no puede exceder los 500 caracteres'],
                },
                imageUrl: {
                    type: String,
                    trim: true,
                    default: '',
                },
                projectUrl: {
                    type: String,
                    trim: true,
                    default: '',
                    match: [/^https?:\/\/.+\..+$/, 'Por favor, ingresa una URL de proyecto válida'],
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
