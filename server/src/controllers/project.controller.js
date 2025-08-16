// myPortfolio/server/src/controllers/project.controller.js
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import logger from '../utils/logger.js';

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - shortDescription
 *         - longDescription
 *         - technologies
 *         - imageUrl
 *         - githubUrl
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *           description: ID único del proyecto.
 *         title:
 *           type: string
 *           description: Título del proyecto.
 *           minLength: 3
 *           maxLength: 150
 *           example: "Plataforma de Gestión de Contenidos"
 *         shortDescription:
 *           type: string
 *           description: Descripción breve del proyecto para listas o tarjetas.
 *           minLength: 10
 *           maxLength: 300
 *           example: "Sistema CMS robusto para administración de sitios web."
 *         longDescription:
 *           type: string
 *           description: Descripción detallada del proyecto.
 *           minLength: 50
 *           maxLength: 5000
 *           example: "Desarrollé un sistema de gestión de contenidos completo..."
 *         technologies:
 *           type: array
 *           items:
 *             type: string
 *             description: ID de la tecnología (Skill)
 *           description: Lista de IDs de tecnologías utilizadas (referencia a Skill).
 *           example: ["60f7c2b8e1b1c8a1b8e1b1c8", "60f7c2b8e1b1c8a1b8e1b1c9"]
 *         imageUrl:
 *           type: string
 *           format: uri
 *           description: URL de la imagen principal del proyecto.
 *           example: ""
 *         liveDemoUrl:
 *           type: string
 *           format: uri
 *           description: URL a una demo en vivo del proyecto (opcional, puede estar vacía).
 *           example: "https://demo.cms-project.com"
 *         githubUrl:
 *           type: string
 *           format: uri
 *           description: URL al repositorio de GitHub del proyecto.
 *           example: "https://github.com/usuario/proyecto"
 *         order:
 *           type: integer
 *           description: Orden de visualización (por defecto 999).
 *           example: 1
 *         isFeatured:
 *           type: boolean
 *           description: Indica si el proyecto es destacado (por defecto false).
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Fecha de creación del proyecto.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Fecha de última actualización.
 */

/**
 * Obtiene todos los proyectos del portafolio, ordenados por prioridad (campo 'order' ascendente).
 *
 * @param {object} req - Objeto de solicitud de Express
 * @param {object} res - Objeto de respuesta de Express
 * @param {Function} next - Función middleware next de Express
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
 * @param {object} req - Objeto de solicitud de Express
 * @param {object} res - Objeto de respuesta de Express
 * @param {Function} next - Función middleware next de Express
 * @returns {Promise<void>} Promesa que se resuelve cuando la operación se completa
 */
export const getProjectById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id).populate('technologies', 'name');
        if (!project) {
            logger.warn(`⚠️ Proyecto con ID ${id} no encontrado.`);
            return res.status(404).json({
                success: false,
                message: 'Proyecto no encontrado.',
                error: {
                    message: 'Proyecto no encontrado',
                    details: [`No se encontró un proyecto con el ID: ${id}`],
                },
            });
        }
        logger.info(`✅ Proyecto con ID ${id} obtenido exitosamente.`);
        res.status(200).json({
            success: true,
            data: project,
            message: `Proyecto con ID ${id} obtenido exitosamente.`,
        });
    } catch (error) {
        logger.error(`❌ Error al obtener proyecto por ID ${req.params.id}:`, {
            error: error.message,
            stack: error.stack,
        });
        next(error);
    }
};

/**
 * Busca el ID de una habilidad por su nombre o ID
 *
 * @param {*} tech - Nombre o ID de la tecnología a buscar
 * @returns {Promise<string|null>} - ID de la habilidad si se encuentra, null en caso contrario
 */
const findSkillId = async (tech) => {
    if (typeof tech === 'string' && tech.length === 24) {
        const skill = await Skill.findById(tech);
        if (skill) {
            return tech;
        }
    }
    const skill = await Skill.findOne({ name: tech.trim() });
    if (skill) {
        return skill._id.toString();
    }
    return null;
};

/**
 * Crea una nueva habilidad en la base de datos
 *
 * @param {*} tech - Nombre o ID de la tecnología a crear
 * @returns {Promise<string>} - ID de la nueva habilidad creada
 */
const createNewSkill = async (tech) => {
    const newSkill = new Skill({
        name: tech.trim(),
        category: 'Otras',
        level: 'Intermedio',
    });
    await newSkill.save();
    logger.info(`✅ Nueva habilidad creada: ${tech.trim()}`);
    return newSkill._id.toString();
};

/**
 * Valida y procesa las tecnologías de un proyecto
 *
 * @param {Array} technologies - Array de tecnologías a validar
 * @returns {Promise<Array>} Array de ObjectIds válidos
 */
const validateTechnologies = async (technologies) => {
    if (!technologies || !Array.isArray(technologies)) {
        return [];
    }
    try {
        const validTechs = await Promise.all(
            technologies.map(async (tech) => {
                const skillId = await findSkillId(tech);
                if (skillId) {
                    return skillId;
                }
                return await createNewSkill(tech);
            }),
        );
        return validTechs.filter(Boolean);
    } catch (error) {
        logger.error('Error validando tecnologías:', error);
        return [];
    }
};

/**
 * Mapea los datos del frontend al modelo de proyecto
 *
 * @param {object} projectData - Datos del proyecto del frontend
 * @returns {object} Datos mapeados para el modelo
 */
const mapProjectData = (projectData) => {
    return {
        title: projectData.title,
        shortDescription: projectData.shortDescription || projectData.summary,
        longDescription: projectData.longDescription || projectData.description,
        technologies: projectData.technologies || [],
        imageUrl: projectData.imageUrl || projectData.thumbnail,
        liveDemoUrl: projectData.liveDemoUrl || projectData.projectUrl || '',
        githubUrl: projectData.githubUrl,
        order: projectData.order || 999,
        isFeatured: projectData.featured || projectData.isFeatured || false,
    };
};

/**
 * Crea un nuevo proyecto
 *
 * @param {object} req - Objeto de solicitud de Express
 * @param {object} res - Objeto de respuesta de Express
 * @param {Function} next - Función middleware next de Express
 */
export const createProject = async (req, res, next) => {
    try {
        const projectData = req.body;
        const validTechnologies = await validateTechnologies(projectData.technologies);
        projectData.technologies = validTechnologies;
        const mappedData = mapProjectData(projectData);
        const newProject = new Project(mappedData);
        const savedProject = await newProject.save();
        const populatedProject = await Project.findById(savedProject._id).populate('technologies', 'name');
        logger.info(`✅ Proyecto creado exitosamente: ${savedProject.title}`);
        res.status(201).json({
            success: true,
            data: populatedProject,
            message: 'Proyecto creado exitosamente.',
        });
    } catch (error) {
        logger.error('❌ Error al crear proyecto:', { error: error.message, stack: error.stack });
        next(error);
    }
};

/**
 * Mapea datos de actualización del proyecto
 *
 * @param {object} updateData - Datos de actualización
 * @param {object} existingProject - Proyecto existente
 * @returns {object} Datos mapeados para actualización
 */
const mapUpdateData = (updateData, existingProject) => {
    return {
        title: updateData.title,
        shortDescription: updateData.shortDescription || updateData.summary,
        longDescription: updateData.longDescription || updateData.description,
        technologies: updateData.technologies || existingProject.technologies,
        imageUrl: updateData.imageUrl || updateData.thumbnail,
        liveDemoUrl: updateData.liveDemoUrl || updateData.projectUrl || '',
        githubUrl: updateData.githubUrl,
        order: updateData.order || existingProject.order,
        isFeatured:
            updateData.featured !== undefined
                ? updateData.featured
                : updateData.isFeatured !== undefined
                  ? updateData.isFeatured
                  : existingProject.isFeatured,
        updatedAt: new Date(),
    };
};

/**
 * Procesa las tecnologías para actualización de proyecto
 *
 * @param {object} updateData - Datos de actualización
 * @returns {Promise<void>} Promise que resuelve cuando se procesan las tecnologías
 */
const processUpdateTechnologies = async (updateData) => {
    if (!updateData.technologies || !Array.isArray(updateData.technologies)) {
        return;
    }
    updateData.technologies = await validateTechnologies(updateData.technologies);
};

/**
 * Valida que un proyecto existe y retorna una respuesta de error si no existe
 *
 * @param {string} id - ID del proyecto
 * @param {object} res - Objeto de respuesta de Express
 * @returns {Promise<object|null>} Proyecto existente o null si no se encuentra
 */
const validateProjectExists = async (id, res) => {
    const existingProject = await Project.findById(id);
    if (!existingProject) {
        logger.warn(`⚠️ Proyecto con ID ${id} no encontrado para actualizar.`);
        res.status(404).json({
            success: false,
            message: 'Proyecto no encontrado',
            error: {
                message: 'Proyecto no encontrado',
                details: [`No se encontró un proyecto con el ID: ${id}`],
            },
        });
        return null;
    }
    return existingProject;
};

/**
 * Actualiza un proyecto existente
 *
 * @param {object} req - Objeto de solicitud de Express
 * @param {object} res - Objeto de respuesta de Express
 * @param {Function} next - Función middleware next de Express
 * @returns {Promise<void>} Promesa que se resuelve cuando la operación se completa
 */
export const updateProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const existingProject = await validateProjectExists(id, res);
        if (!existingProject) {
            return;
        }
        await processUpdateTechnologies(updateData);
        const mappedData = mapUpdateData(updateData, existingProject);
        const updatedProject = await Project.findByIdAndUpdate(id, mappedData, {
            new: true,
            runValidators: true,
        }).populate('technologies', 'name');

        logger.info(`✅ Proyecto actualizado exitosamente: ${updatedProject.title}`);
        res.status(200).json({
            success: true,
            data: updatedProject,
            message: 'Proyecto actualizado exitosamente.',
        });
    } catch (error) {
        logger.error(`❌ Error al actualizar proyecto ${req.params.id}:`, {
            error: error.message,
            stack: error.stack,
        });
        next(error);
    }
};

/**
 * Elimina un proyecto
 *
 * @param {object} req - Objeto de solicitud de Express
 * @param {object} res - Objeto de respuesta de Express
 * @param {Function} next - Función middleware next de Express
 * @returns {Promise<void>} Promesa que se resuelve cuando la operación se completa
 */
export const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const existingProject = await Project.findById(id);
        if (!existingProject) {
            logger.warn(`⚠️ Proyecto con ID ${id} no encontrado para eliminar.`);
            return res.status(404).json({
                success: false,
                message: 'Proyecto no encontrado',
                error: {
                    message: 'Proyecto no encontrado',
                    details: [`No se encontró un proyecto con el ID: ${id}`],
                },
            });
        }
        await Project.findByIdAndDelete(id);
        logger.info(`✅ Proyecto eliminado exitosamente: ${existingProject.title}`);
        res.status(200).json({
            success: true,
            data: { id },
            message: 'Proyecto eliminado exitosamente.',
        });
    } catch (error) {
        logger.error(`❌ Error al eliminar proyecto ${req.params.id}:`, {
            error: error.message,
            stack: error.stack,
        });
        next(error);
    }
};

/**
 * Obtiene los proyectos destacados del portafolio, ordenados por prioridad y fecha de creación.
 *
 * @param {object} req - Objeto de solicitud de Express
 * @param {object} res - Objeto de respuesta de Express
 * @param {Function} next - Función middleware next de Express
 * @swagger
 * /api/projects/featured:
 *   get:
 *     summary: Obtiene proyectos destacados
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
export const getFeaturedProjects = async (req, res, next) => {
    try {
        const featuredProjects = await Project.find({ isFeatured: true })
            .populate('technologies', 'name')
            .sort({ order: 1, createdAt: -1 })
            .limit(4);
        logger.info('✅ Proyectos destacados obtenidos exitosamente.');
        res.status(200).json({
            success: true,
            data: featuredProjects,
            message: 'Proyectos destacados obtenidos exitosamente.',
        });
    } catch (error) {
        logger.error('❌ Error al obtener proyectos destacados:', {
            error: error.message,
            stack: error.stack,
        });
        next(error);
    }
};
