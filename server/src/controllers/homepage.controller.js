// myPortfolio/server/src/controllers/homepage.controller.js
import User from '../models/User.js';
import logger from '../utils/logger.js';

/**
 * @typedef {object} SocialLink
 * @property {string} platform - Nombre de la plataforma (ej. "GitHub").
 * @property {string} url - URL del perfil.
 */

/**
 * @typedef {object} FeaturedProject
 * @property {string} title - Título del proyecto.
 * @property {string} description - Descripción breve del proyecto.
 * @property {string} imageUrl - URL de la imagen del proyecto.
 * @property {string} projectUrl - URL al proyecto (repositorio, demo, etc.).
 */

/**
 * @typedef {object} UserProfileRequestBody
 * @property {string} name - Nombre completo.
 * @property {string} title - Título profesional.
 * @property {string} bio - Biografía.
 * @property {string} [profilePicture] - URL de la imagen de perfil.
 * @property {SocialLink[]} [socialLinks] - Enlaces a redes sociales.
 * @property {string[]} [skills] - Lista de habilidades.
 * @property {FeaturedProject[]} [featuredProjects] - Proyectos destacados.
 */

const createDefaultProfile = async () => {
    const defaultProfile = {
        name: 'Deiby Arango',
        title: 'Full-stack Developer',
        bio: 'Apasionado por la creación de soluciones web robustas y escalables, con experiencia en tecnologías modernas y un enfoque en el rendimiento y la experiencia de usuario.',
        profilePicture: 'https://res.cloudinary.com/your_cloud_name/image/upload/v123456789/profile.jpg',
        socialLinks: [
            { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/deibyarango/' },
            { platform: 'GitHub', url: 'https://github.com/Defer1189' },
        ],
        skills: ['JavaScript', 'Node.js', 'Express.js', 'React', 'MongoDB', 'PostgreSQL'],
        featuredProjects: [
            {
                title: 'Plataforma de Gestión de Contenidos',
                description: 'Sistema CMS robusto para la administración de sitios web dinámicos.',
                imageUrl: 'https://res.cloudinary.com/your_cloud_name/image/upload/v123456789/cms-project.jpg',
                projectUrl: 'https://github.com/deibyarango/cms-project',
            },
            {
                title: 'Aplicación de Chat en Tiempo Real',
                description: 'Aplicación de chat con websockets y autenticación de usuarios.',
                imageUrl: 'https://res.cloudinary.com/your_cloud_name/image/upload/v123456789/chat-app.jpg',
                projectUrl: 'https://github.com/deibyarango/realtime-chat',
            },
        ],
    };

    const createdProfile = await User.create(defaultProfile);
    logger.info('✅ Perfil de usuario por defecto creado');
    return createdProfile;
};

const handleValidationError = (error, res) => {
    const errors = Object.values(error.errors).map((err) => err.message);
    logger.warn('Error de validación', { details: errors });
    return res.status(400).json({ error: 'Error de validación', details: errors });
};

const handleServerError = (error, res, context) => {
    logger.error(`❌ Error en ${context}`, {
        error: error.message,
        stack: error.stack,
    });
    return res.status(500).json({
        error: `Error interno en ${context}`,
        details: error.message,
    });
};

const validateRequiredFields = (data, fields) => {
    return fields.filter((field) => !data[field]);
};

/**
 * Obtiene el perfil del usuario del portafolio.
 * Si no existe un perfil, crea uno por defecto.
 *
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const getUserProfile = async (req, res) => {
    try {
        let userProfile = await User.findOne({});

        if (!userProfile) {
            logger.info('Creando perfil por defecto');
            userProfile = await createDefaultProfile();
        }

        logger.info('✅ Perfil obtenido');
        return res.status(200).json(userProfile);
    } catch (error) {
        return handleServerError(error, res, 'obtener perfil');
    }
};

/**
 * Actualiza el perfil del usuario del portafolio.
 * (Funcionalidad para un futuro panel de administración o si se necesita actualizar manualmente).
 *
 * @param {import('express').Request<{}, {}, UserProfileRequestBody>} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>}
 */
export const updateOrCreateUserProfile = async (req, res) => {
    try {
        const { body } = req;
        const requiredFields = ['name', 'title', 'bio'];
        const missingFields = validateRequiredFields(body, requiredFields);

        if (missingFields.length > 0) {
            return res.status(400).json({
                error: 'Campos requeridos faltantes',
                missingFields,
            });
        }

        const userProfile = await User.findOneAndUpdate(
            {},
            { $set: body },
            { new: true, upsert: true, runValidators: true },
        );

        logger.info('✅ Perfil actualizado', { id: userProfile._id });
        return res.status(200).json({
            message: 'Perfil actualizado',
            data: userProfile,
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return handleValidationError(error, res);
        }
        return handleServerError(error, res, 'actualizar perfil');
    }
};
