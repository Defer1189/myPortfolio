// myPortfolio/server/src/routes/project.routes.js
import { Router } from 'express';

import {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getFeaturedProjects,
} from '../controllers/project.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Projects
 *     description: Gestión de proyectos del portafolio.
 */

// Rutas públicas
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
 * /api/projects/featured:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Obtiene proyectos destacados.
 *     responses:
 *       200:
 *         description: Proyectos destacados obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *                 message:
 *                   type: string
 */
router.get('/featured', getFeaturedProjects);

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

// Rutas protegidas - requieren autenticación
/**
 * @swagger
 * /api/projects:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Crea un nuevo proyecto (requiere autenticación).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       201:
 *         description: Proyecto creado exitosamente.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 */
router.post('/', protect, restrictTo('admin', 'editor'), createProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     tags:
 *       - Projects
 *     summary: Actualiza un proyecto existente (requiere autenticación).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del proyecto.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *     responses:
 *       200:
 *         description: Proyecto actualizado exitosamente.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 *       404:
 *         description: Proyecto no encontrado.
 */
router.put('/:id', protect, restrictTo('admin', 'editor'), updateProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Elimina un proyecto (requiere autenticación de administrador).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del proyecto.
 *     responses:
 *       200:
 *         description: Proyecto eliminado exitosamente.
 *       401:
 *         description: No autorizado.
 *       403:
 *         description: Acceso denegado.
 *       404:
 *         description: Proyecto no encontrado.
 */
router.delete('/:id', protect, restrictTo('admin'), deleteProject);

export default router;
