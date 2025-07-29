// myPortfolio/server/src/controllers/pageContent.controller.js
import PageContent from '../models/PageContent.js';
import logger from '../utils/logger.js';

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
const getDefaultContentData = (pageName) => ({
    pageName,
    title: 'Título por Defecto',
    introduction: 'Este es un párrafo de introducción por defecto para la página.',
    sections: [{ sectionTitle: 'Sección por Defecto', text: 'Contenido de la primera sección por Defecto.' }],
});

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
 * Obtiene el contenido de una página específica por su nombre único.
 *
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @swagger
 * /api/content/{pageName}:
 *   get:
 *     summary: Obtiene el contenido de una página específica.
 *     description: |
 *       Recupera el contenido de la página indicada por el parámetro `pageName`.
 *       Si el contenido no existe, se crea un contenido por defecto para la página solicitada.
 *     tags:
 *       - Contenido de Página
 *     parameters:
 *       - in: path
 *         name: pageName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la página cuyo contenido se desea obtener.
 *     responses:
 *       200:
 *         description: Contenido de la página obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PageContent'
 *       404:
 *         description: No se encontró contenido para la página especificada.
 *       500:
 *         description: Error interno del servidor al obtener el contenido de la página.
 */
export const getPageContent = async (req, res) => {
    const { pageName } = req.params;

    try {
        let content = await PageContent.findOne({ pageName });

        if (!content) {
            content = await createDefaultPageContent(pageName);
        }
        logger.info(`✅ Contenido de la página: '${pageName}' obtenido.`);
        res.status(200).json(content);
    } catch (error) {
        handleServerError(error, res, `obtener contenido para '${pageName}'`);
    }
};

/**
 * Actualiza o crea el contenido de una página específica según el nombre único de la página.
 *
 * @param {import('express').Request} req - Objeto de solicitud de Express.
 * @param {import('express').Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} Envía una respuesta JSON con el resultado de la operación.
 * @swagger
 * /api/content/{pageName}:
 *   put:
 *     summary: Actualiza o crea el contenido de una página.
 *     description: Actualiza el contenido de la página especificada por el parámetro `pageName`. Si la página no existe, se crea un nuevo registro. Requiere un cuerpo con los datos a actualizar.
 *     tags:
 *       - Contenido de Página
 *     parameters:
 *       - in: path
 *         name: pageName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la página cuyo contenido se va a actualizar o crear.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Datos del contenido de la página a actualizar.
 *     responses:
 *       200:
 *         description: Contenido de la página actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contenido de la página actualizado exitosamente.
 *                 data:
 *                   type: object
 *                   description: El contenido actualizado de la página.
 *       400:
 *         description: Error de validación en los datos enviados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error de validación de Mongoose.
 *       500:
 *         description: Error interno del servidor al actualizar el contenido de la página.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error interno del servidor.
 */
export const updatePageContent = async (req, res) => {
    const { pageName } = req.params;
    const { body } = req;

    try {
        const updatedContent = await PageContent.findOneAndUpdate(
            { pageName },
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
