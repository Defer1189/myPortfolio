// myPortfolio/server/src/controllers/homepage.controller.js
import Homepage from '../models/Homepage.js';
import User from '../models/User.js';
import logger from '../utils/logger.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     HomepageResponse:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/User'
 *           description: Perfil completo del usuario
 *         skills:
 *           type: array
 *           description: Habilidades destacadas configuradas para la homepage
 *           items:
 *             $ref: '#/components/schemas/Skill'
 *         featuredProjects:
 *           type: array
 *           description: Proyectos destacados con información reducida
 *           items:
 *             $ref: '#/components/schemas/FeaturedProject'
 *       example:
 *         user:
 *           name: "Deiby Arango"
 *           title: "Full-stack Developer"
 *           bio: "Apasionado por crear soluciones web..."
 *         skills:
 *           - name: "JavaScript"
 *             category: "Frontend"
 *         featuredProjects:
 *           - title: "E-commerce Platform"
 *             description: "Plataforma de comercio electrónico..."
 *
 *     FeaturedProject:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           format: ObjectId
 *           example: "60f7c2b8e1b1c8a1b8e1b1c8"
 *         title:
 *           type: string
 *           example: "E-commerce Platform"
 *         description:
 *           type: string
 *           example: "Plataforma de comercio electrónico con carrito de compras"
 *         imageUrl:
 *           type: string
 *           format: url
 *           example: "https://placehold.co/600x400/FF0000/FFFFFF?text=E-commerce"
 *         liveDemoUrl:
 *           type: string
 *           format: url
 *           example: "https://demo.ecommerce.com"
 *         githubUrl:
 *           type: string
 *           format: url
 *           example: "https://github.com/yourusername/ecommerce-platform"
 */

/**
 * Obtiene y popula los datos de la homepage
 *
 * @returns {Promise<object>} Documento de homepage con referencias pobladas
 */
async function fetchPopulatedHomepage() {
    return await Homepage.findOne({})
        .populate({
            path: 'user',
            select: 'name title bio profilePicture socialLinks featuredSkills',
            populate: {
                path: 'featuredSkills',
                select: 'name category iconUrl level',
            },
        })
        .populate({
            path: 'skills',
            select: 'name category iconUrl level',
        })
        .populate({
            path: 'featuredProjects',
            select: 'title shortDescription imageUrl liveDemoUrl githubUrl',
        });
}

/**
 * Construye la respuesta estructurada para el frontend
 *
 * @param {object} homepage - Documento de homepage con referencias pobladas
 * @returns {object} Respuesta estructurada para el frontend
 */
function buildHomepageResponse(homepage) {
    return {
        user: homepage.user,
        skills: homepage.skills,
        featuredProjects: homepage.featuredProjects.map((proj) => ({
            _id: proj._id,
            title: proj.title,
            description: proj.shortDescription,
            imageUrl: proj.imageUrl,
            liveDemoUrl: proj.liveDemoUrl,
            githubUrl: proj.githubUrl,
        })),
    };
}

/**
 * Controlador para obtener los datos completos de la página de inicio.
 *
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar el control al siguiente middleware.
 * @returns {Promise<void>} Responde con los datos de la homepage o un error.
 *
 * @swagger
 * /api/homepage:
 *   get:
 *     summary: Obtiene datos completos de la página de inicio
 *     description: Retorna perfil de usuario, habilidades y proyectos destacados con referencias pobladas
 *     tags: [Homepage]
 *     responses:
 *       200:
 *         description: Datos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HomepageResponse'
 *       404:
 *         description: Homepage no configurada (ejecutar seeder)
 *         content:
 *           application/json:
 *             example: { message: "Configuración no encontrada. Ejecute el seeder." }
 *       500:
 *         description: Error interno del servidor
 */
export const getHomepageData = async (req, res, next) => {
    try {
        const homepage = await fetchPopulatedHomepage();

        if (!homepage) {
            logger.warn('Homepage no configurada. Ejecute el seeder.');
            return res.status(404).json({
                message: 'Configuración no encontrada. Ejecute el seeder.',
            });
        }

        const response = buildHomepageResponse(homepage);
        logger.info('✅ Homepage obtenida con referencias pobladas');
        res.status(200).json(response);
    } catch (error) {
        logger.error('Error al obtener Homepage:', error);
        next(error);
    }
};

/**
 * Controlador para actualizar o crear el perfil principal del usuario.
 *
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar el control al siguiente middleware.
 * @returns {Promise<void>} Responde con el perfil actualizado o un error.
 *
 * @swagger
 * /api/homepage/profile:
 *   put:
 *     summary: Actualiza el perfil de usuario principal
 *     tags: [UserProfile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Perfil actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Perfil actualizado"
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Validación fallida
 *         content:
 *           application/json:
 *             examples:
 *               missingFields:
 *                 value: { error: "Campos requeridos faltantes", details: ["name"] }
 *               invalidSkills:
 *                 value: { error: "IDs de habilidades inválidos", invalidIds: ["12345"] }
 *       500:
 *         description: Error interno del servidor
 */
export const updateOrCreateUserProfile = async (req, res, next) => {
    try {
        await handleUserProfileUpdate(req, res);
    } catch (error) {
        logger.error('Error actualizando perfil:', error);
        next(error);
    }
};

/**
 * Maneja la actualización o creación del perfil principal del usuario.
 *
 * @param {import('express').Request} req - Objeto de solicitud HTTP que contiene los datos del perfil de usuario.
 * @param {import('express').Response} res - Objeto de respuesta HTTP utilizado para enviar el resultado.
 * @returns {Promise<void>} Envía una respuesta JSON con el perfil actualizado o errores de validación.
 */
async function handleUserProfileUpdate(req, res) {
    const { body } = req;
    const missingFields = getMissingFields(body, ['name', 'title', 'bio']);
    if (missingFields.length > 0) {
        return res.status(400).json({
            error: 'Campos requeridos faltantes',
            details: missingFields,
        });
    }

    const updates = buildUserProfileUpdates(body);

    if (updates.featuredSkills) {
        const validationResult = await validateSkillIds(updates.featuredSkills);
        if (validationResult.invalidIds.length > 0) {
            return res.status(400).json({
                error: 'IDs de habilidades inválidos',
                invalidIds: validationResult.invalidIds,
            });
        }
    }

    const userProfile = await updateUserProfile(updates);

    logger.info(`✅ Perfil actualizado: ${userProfile._id}`);
    res.status(200).json({
        message: 'Perfil actualizado',
        data: userProfile,
    });
}

/**
 * Devuelve los campos requeridos que faltan en el cuerpo de la solicitud.
 *
 * @param {object} body - Cuerpo de la solicitud a validar.
 * @param {string[]} requiredFields - Lista de campos requeridos a verificar en el cuerpo.
 * @returns {string[]} Un array con los nombres de los campos requeridos que faltan en el cuerpo.
 */
function getMissingFields(body, requiredFields) {
    return requiredFields.filter((field) => !body[field]);
}

/**
 * Construye el objeto de actualización del perfil de usuario.
 *
 * @param {object} body - Cuerpo de la solicitud con los datos del perfil de usuario.
 * @returns {object} Objeto con los campos a actualizar en el perfil de usuario.
 */
function buildUserProfileUpdates(body) {
    return {
        name: body.name,
        title: body.title,
        bio: body.bio,
        ...(body.profilePicture !== undefined && { profilePicture: body.profilePicture }),
        ...(body.socialLinks !== undefined && { socialLinks: body.socialLinks }),
        ...(body.featuredSkills !== undefined && { featuredSkills: body.featuredSkills }),
    };
}

/**
 * Actualiza o crea el perfil de usuario principal.
 *
 * @param {object} updates - Objeto con los campos a actualizar en el perfil de usuario.
 * @returns {Promise<object>} El documento actualizado o creado del usuario principal.
 */
async function updateUserProfile(updates) {
    return await User.findOneAndUpdate(
        {},
        { $set: updates },
        {
            new: true,
            upsert: true,
            runValidators: true,
            populate: {
                path: 'featuredSkills',
                select: 'name category iconUrl level',
            },
        },
    );
}

/**
 * Valida un array de IDs de habilidades
 *
 * @param {Array<string>} skillIds - Array de IDs de habilidades a validar
 * @returns {Promise<{ validIds: Array<string>, invalidIds: Array<string> }>} IDs válidos e inválidos
 */
async function validateSkillIds(skillIds) {
    const validSkills = await User.find({
        _id: { $in: skillIds },
    }).select('_id');

    const validIds = validSkills.map((skill) => skill._id.toString());
    const invalidIds = skillIds.filter((id) => !validIds.includes(id));

    return { validIds, invalidIds };
}
