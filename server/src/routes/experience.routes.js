// myPortfolio/server/src/routes/experience.routes.js
import { Router } from 'express';

import { getAllExperience } from '../controllers/experience.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Experience
 *     description: Gestión de la experiencia profesional y educativa del propietario del portafolio.
 */

/**
 * @swagger
 * /api/experience:
 *   get:
 *     tags:
 *       - Experience
 *     summary: Obtiene toda la experiencia profesional y educativa.
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
router.get('/', getAllExperience);

export default router;
