// myPortfolio/server/src/controllers/project.controller.js
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
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
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
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
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} Promise that resolves when the operation is complete
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
 * Valida y procesa las tecnologías de un proyecto
 *
 * @param {Array} technologies - Array de tecnologías a validar
 * @returns {Array} Array de ObjectIds válidos
 */
const validateTechnologies = async (technologies) => {
    if (!technologies || !Array.isArray(technologies)) {
        return [];
    }

    const validTechnologies = [];

    for (const tech of technologies) {
        if (typeof tech === 'string' && tech.length === 24) {
            // Es un ObjectId válido
            const skill = await Skill.findById(tech);
            if (skill) {
                validTechnologies.push(tech);
            }
        } else if (typeof tech === 'string') {
            // Es un nombre de tecnología, buscar o crear
            let skill = await Skill.findOne({ name: tech.trim() });
            if (!skill) {
                // Crear nueva habilidad si no existe
                skill = new Skill({
                    name: tech.trim(),
                    category: 'Otras', // Categoría por defecto
                    level: 'Intermedio',
                });
                await skill.save();
                logger.info(`✅ Nueva habilidad creada: ${tech.trim()}`);
            }
            validTechnologies.push(skill._id);
        }
    }

    return validTechnologies;
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
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const createProject = async (req, res, next) => {
    try {
        const projectData = req.body;

        // Validar tecnologías
        const validTechnologies = await validateTechnologies(projectData.technologies);
        projectData.technologies = validTechnologies;

        // Mapear datos
        const mappedData = mapProjectData(projectData);

        // Crear el proyecto
        const newProject = new Project(mappedData);
        const savedProject = await newProject.save();

        // Poblar las tecnologías para la respuesta
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

    const validTechnologies = await validateTechnologies(updateData.technologies);
    updateData.technologies = validTechnologies;
};

/**
 * Valida que un proyecto existe y retorna una respuesta de error si no existe
 *
 * @param {string} id - ID del proyecto
 * @param {object} res - Express response object
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
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} Promise that resolves when the operation is complete
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
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Promise<void>} Promise that resolves when the operation is complete
 */
export const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Verificar que el proyecto existe
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

        // Eliminar el proyecto
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
 * Obtiene proyectos destacados
 *
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const getFeaturedProjects = async (req, res, next) => {
    try {
        const featuredProjects = await Project.find({ isFeatured: true })
            .populate('technologies', 'name')
            .sort({ order: 1, createdAt: -1 });

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
