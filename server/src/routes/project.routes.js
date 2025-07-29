// myPortfolio/server/src/routes/project.routes.js
import { Router } from 'express';

import { getAllProjects, getProjectById } from '../controllers/project.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Projects
 *     description: Gestión de proyectos del portafolio.
 */

/**
 * @swagger
 * /api/projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Obtiene todos los proyectos del portafolio.
 *     responses:
 *       200:
 *         description: Lista de proyectos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', getAllProjects);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Obtiene un proyecto por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del proyecto.
 *     responses:
 *       200:
 *         description: Proyecto obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Proyecto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id', getProjectById);

export default router;
