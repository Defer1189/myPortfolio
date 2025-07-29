// myPortfolio/server/src/controllers/project.controller.js
import Project from '../models/Project.js';
import logger from '../utils/logger.js';

/**
 * @swagger
 * tags:
 *   - name: Projects
 *     description: Gestión de proyectos del portafolio
 */

/**
 * Obtiene todos los proyectos del portafolio, ordenados por prioridad (campo 'order' ascendente).
 *
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware.
 * @swagger
 * /api/projects:
 *   get:
 *     tags: [Projects]
 *     summary: Obtiene todos los proyectos
 *     description: Retorna proyectos ordenados por prioridad (campo 'order' ascendente)
 *     responses:
 *       200:
 *         description: Lista de proyectos exitosamente obtenida
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *             example:
 *               - _id: "6624a7d9a8d4c3a9c8f7b1a2"
 *                 title: "Plataforma E-commerce"
 *                 shortDescription: "Tienda online con pasarela de pagos"
 *                 order: 1
 *                 isFeatured: true
 *               - _id: "6624a7d9a8d4c3a9c8f7b1a3"
 *                 title: "Sistema CMS"
 *                 shortDescription: "Gestor de contenidos para blogs"
 *                 order: 2
 *                 isFeatured: false
 *       500:
 *         description: Error interno del servidor
 */
export const getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find({}).populate('technologies', 'name').sort({ order: 1, createdAt: -1 });
        logger.info('✅ Proyectos obtenidos exitosamente.');
        res.status(200).json(projects);
    } catch (error) {
        logger.error('❌ Error al obtener todos los proyectos:', { error: error.message, stack: error.stack });
        next(error);
    }
};

/**
 * Obtiene un proyecto específico del portafolio usando su ID único.
 *
 * @param {import('express').Request} req - Objeto de solicitud HTTP.
 * @param {import('express').Response} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar al siguiente middleware.
 * @returns {Promise<void>} Retorna una promesa que responde con el proyecto encontrado o un error.
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     tags: [Projects]
 *     summary: Obtiene un proyecto por ID
 *     description: Retorna un proyecto específico usando su ID único
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: objectid
 *         description: ID válido de MongoDB
 *     responses:
 *       200:
 *         description: Proyecto obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Proyecto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
export const getProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id).populate('technologies', 'name');

        if (!project) {
            logger.warn(`⚠️ Proyecto con ID ${id} no encontrado.`);
            return res.status(404).json({ message: 'Proyecto no encontrado.' });
        }

        logger.info(`✅ Proyecto con ID ${id} obtenido exitosamente.`);
        res.status(200).json(project);
    } catch (error) {
        logger.error(`❌ Error al obtener proyecto por ID ${req.params.id}:`, {
            error: error.message,
            stack: error.stack,
        });
        next(error);
    }
};
