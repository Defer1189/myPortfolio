// myPortfolio/server/src/controllers/skill.controller.js
import Skill from '../models/Skill.js';
import logger from '../utils/logger.js';

/**
 * @swagger
 * tags:
 *   - name: Skills
 *     description: Gestión de habilidades del propietario del portafolio.
 */

/**
 * Obtiene todas las habilidades técnicas del portafolio, ordenadas por prioridad y nombre.
 *
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware.
 * @swagger
 * /api/skills:
 *   get:
 *     tags: [Skills]
 *     summary: Obtiene todas las habilidades técnicas
 *     description: Retorna habilidades ordenadas por prioridad (campo 'order' ascendente)
 *     responses:
 *       200:
 *         description: Lista de habilidades obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skill'
 *             example:
 *               - _id: "6624a7d9a8d4c3a9c8f7b1b1"
 *                 name: "JavaScript"
 *                 category: "Frontend"
 *                 level: "Avanzado"
 *                 order: 1
 *               - _id: "6624a7d9a8d4c3a9c8f7b1b2"
 *                 name: "Node.js"
 *                 category: "Backend"
 *                 level: "Intermedio"
 *                 order: 2
 *       500:
 *         description: Error interno del servidor
 */
export const getAllSkills = async (req, res, next) => {
    try {
        const skills = await Skill.find({}).sort({ order: 1, name: 1 });
        logger.info('✅ Habilidades obtenidas exitosamente.');
        res.status(200).json(skills);
    } catch (error) {
        logger.error('❌ Error al obtener todas las habilidades:', { error: error.message, stack: error.stack });
        next(error);
    }
};
