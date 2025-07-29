// myPortfolio/server/src/routes/skill.routes.js
import { Router } from 'express';

import { getAllSkills } from '../controllers/skill.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Skills
 *     description: Gestión de habilidades del propietario del portafolio.
 */

/**
 * @swagger
 * /api/skills:
 *   get:
 *     tags:
 *       - Skills
 *     summary: Obtiene todas las habilidades del portafolio.
 *     responses:
 *       200:
 *         description: Lista de habilidades obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skill'
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', getAllSkills);

export default router;
