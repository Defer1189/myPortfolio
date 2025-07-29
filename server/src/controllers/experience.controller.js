// myPortfolio/server/src/controllers/experience.controller.js
import Experience from '../models/Experience.js';
import logger from '../utils/logger.js';

/**
 * @swagger
 * tags:
 *   - name: Experience
 *     description: Gestión de la experiencia profesional y educativa del propietario del portafolio.
 */

/**
 * Controlador para obtener toda la experiencia profesional y educativa.
 *
 * @param {import('express').Request} req - Solicitud HTTP.
 * @param {import('express').Response} res - Respuesta HTTP.
 * @param {Function} next - Middleware siguiente.
 * @swagger
 * /api/experience:
 *   get:
 *     tags:
 *       - Experience
 *     summary: Obtiene toda la experiencia profesional y educativa.
 *     description: Retorna una lista de todas las entradas de experiencia (trabajo, educación, certificaciones), ordenadas por el campo 'order' ascendente y fecha de inicio descendente.
 *     responses:
 *       200:
 *         description: Lista de experiencia obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Experience'
 *       500:
 *         description: Error interno del servidor.
 */
export const getAllExperience = async (req, res, next) => {
    try {
        const experience = await Experience.find({}).sort({ order: 1, startDate: -1 });
        logger.info('✅ Experiencia obtenida exitosamente.');
        res.status(200).json(experience);
    } catch (error) {
        logger.error('❌ Error al obtener toda la experiencia:', { error: error.message, stack: error.stack });
        next(error);
    }
};
