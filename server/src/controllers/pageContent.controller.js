// myPortfolio/server/src/controllers/pageContent.controller.js
import PageContent from '../models/PageContent.js';
import logger from '../utils/logger.js';

// Constantes para los textos largos de las páginas.
// Se declaran aquí para reducir el número de líneas dentro de la función getDefaultContentData.
const CONTACT_INTRO_TEXT =
    '¡Estoy siempre abierto a nuevas oportunidades, colaboraciones o simplemente para charlar! Si tienes alguna pregunta, propuesta de proyecto o deseas conocer más sobre mi trabajo, no dudes en enviarme un mensaje.';
const ABOUT_ME_INTRO_TEXT =
    'Conoce más sobre mi trayectoria, pasiones y lo que me impulsa en el mundo del desarrollo web.';
const ABOUT_ME_HISTORY_TEXT =
    'Desde muy joven, la tecnología capturó mi interés. Empecé a experimentar con pequeños códigos y a construir cosas, lo que me llevó a mi pasión por el desarrollo web.';
const ABOUT_ME_PHILOSOPHY_TEXT =
    'Me enfoco en construir soluciones robustas y escalables, con una atención meticulosa al detalle y la experiencia de usuario. Siempre busco aprender y aplicar las últimas tecnologías.';

// Mapa para definir los valores por defecto específicos de cada página.
// Esto reduce la longitud de la función getDefaultContentData al sacar las definiciones detalladas.
const PAGE_CONTENT_DEFAULTS = {
    contact: {
        title: 'Contáctame',
        introduction: CONTACT_INTRO_TEXT,
        sections: [],
    },
    about: {
        title: 'Acerca de Mí',
        introduction: ABOUT_ME_INTRO_TEXT,
        sections: [
            { sectionTitle: 'Mi Historia', text: ABOUT_ME_HISTORY_TEXT },
            { sectionTitle: 'Filosofía de Trabajo', text: ABOUT_ME_PHILOSOPHY_TEXT },
        ],
    },
    // Añadir más entradas aquí para otras páginas si fuera necesario (ej., 'services', 'blog', etc.)
};

/**
 * @typedef {object} PageContentPayload
 * @property {string} pageName - Nombre único de la página (ej. "contact", "about").
 * @property {string} title - Título principal de la sección.
 * @property {string} introduction - Párrafo introductorio de la sección (opcional).
 * @property {Array<object>} [sections] - Lista de bloques de contenido personalizados por página (opcional).
 */

/**
 * Maneja errores de validación de Mongoose de forma estandarizada.
 *
 * @param {Error} error - El objeto de error de Mongoose.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {import('express').Response} Respuesta de error 400.
 */
const handleMongooseValidationError = (error, res) => {
    const errors = Object.values(error.errors).map((err) => err.message);
    logger.warn('⚠️ Error de validación de Mongoose en contenido de página.', { details: errors });
    return res.status(400).json({ error: 'Error de validación', details: errors });
};

/**
 * Maneja errores internos del servidor de forma estandarizada.
 *
 * @param {Error} error - El objeto de error.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @param {string} context - Descripción del contexto del error (ej. "obtener contenido", "actualizar contenido").
 * @returns {import('express').Response} Respuesta de error 500.
 */
const handleServerError = (error, res, context) => {
    logger.error(`❌ Error interno del servidor al ${context}.`, {
        error: error.message,
        stack: error.stack,
    });
    return res.status(500).json({
        error: `Error interno del servidor al ${context}`,
        details: error.message,
    });
};

/**
 * Retorna los datos de contenido por defecto para una página específica.
 *
 * @param {string} pageName - El nombre de la página.
 * @returns {object} Los datos de contenido por defecto.
 */
const getDefaultContentData = (pageName) => {
    const baseData = {
        pageName: pageName,
        title: 'Título por Defecto',
        introduction: 'Este es un párrafo de introducción por defecto para la página.',
        sections: [{ sectionTitle: 'Sección por Defecto', text: 'Contenido de la primera sección por Defecto.' }],
    };

    const specificData = PAGE_CONTENT_DEFAULTS[pageName];

    return specificData ? { ...baseData, ...specificData } : baseData;
};

/**
 * Crea un documento de contenido de página por defecto si no existe.
 *
 * @param {string} pageName - El nombre de la página para la cual crear contenido por defecto.
 * @returns {Promise<import('../models/PageContent.js').default>} El documento de contenido creado.
 */
const createDefaultPageContent = async (pageName) => {
    const defaultContentData = getDefaultContentData(pageName);
    const createdContent = await PageContent.create(defaultContentData);
    logger.info(`✅ Contenido por defecto para la página '${pageName}' creado.`);
    return createdContent;
};

/**
 * @swagger
 * /api/content/{pageName}:
 *   get:
 *     tags: [Page Content]
 *     summary: Obtiene el contenido de una página específica.
 *     description: Retorna el título, introducción y secciones de una página por su nombre único. Si el contenido de la página no existe, se crea uno por defecto.
 *     parameters:
 *       - in: path
 *         name: pageName
 *         required: true
 *         schema:
 *           type: string
 *         description: El nombre único de la página (ej., 'contact', 'about').
 *         examples:
 *           contact:
 *             value: contact
 *           about:
 *             value: about
 *     responses:
 *       200:
 *         description: Contenido de la página obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PageContent'
 *       500:
 *         description: Error interno del servidor al obtener el contenido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor al obtener el contenido de la página."
 */

export const getPageContent = async (req, res) => {
    const { pageName } = req.params;

    try {
        let content = await PageContent.findOne({ pageName });

        if (!content) {
            content = await createDefaultPageContent(pageName);
        }
        res.setHeader('Content-Type', 'application/json');
        logger.info(`✅ Contenido de la página: '${pageName}' obtenido.`);
        res.status(200).json(content);
    } catch (error) {
        res.setHeader('Content-Type', 'application/json');
        handleServerError(error, res, `obtener contenido para '${pageName}'`);
    }
};

/**
 * @swagger
 * /api/content/{pageName}:
 *   post:
 *     tags: [Page Content]
 *     summary: Crea o actualiza el contenido de una página específica.
 *     description: Permite actualizar el título, introducción y secciones de una página por su nombre único. Si el contenido no existe, se crea. Esta funcionalidad es ideal para un panel de administración.
 *     parameters:
 *       - in: path
 *         name: pageName
 *         required: true
 *         schema:
 *           type: string
 *         description: El nombre único de la página a actualizar (ej., 'contact', 'about').
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PageContent'
 *           examples:
 *             contactUpdate:
 *               value:
 *                 title: "¡Contáctame Ahora!"
 *                 introduction: "Mi equipo y yo estamos listos para escucharte. Envíanos tu mensaje..."
 *                 sections: []
 *             aboutUpdate:
 *               value:
 *                 title: "Sobre Deiby Arango - Full-Stack Dev"
 *                 introduction: "Mi viaje en el desarrollo web..."
 *                 sections:
 *                   - sectionTitle: "Mi Filosofía"
 *                     text: "Creo en el código limpio..."
 *                   - sectionTitle: "Mis Habilidades"
 *                     text: "JavaScript, React, Node, etc."
 *     responses:
 *       200:
 *         description: Contenido de la página actualizado/creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contenido de la página actualizado exitosamente."
 *                 data:
 *                   $ref: '#/components/schemas/PageContent'
 *       400:
 *         description: Error de validación de entrada o datos inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error de validación"
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: "El título es requerido."
 *       500:
 *         description: Error interno del servidor al actualizar el contenido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor al actualizar el contenido de la página."
 */

export const updatePageContent = async (req, res) => {
    const { pageName } = req.params;
    const { body } = req;

    try {
        const updatedContent = await PageContent.findOneAndUpdate(
            { pageName: pageName },
            { $set: body },
            { new: true, upsert: true, runValidators: true },
        );

        logger.info(`✅ Contenido para la página '${pageName}' actualizado/creado.`);
        res.status(200).json({
            message: 'Contenido de la página actualizado exitosamente.',
            data: updatedContent,
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return handleMongooseValidationError(error, res);
        }
        handleServerError(error, res, `actualizar contenido para '${pageName}'`);
    }
};
