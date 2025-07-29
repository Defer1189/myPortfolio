// myPortfolio/client/src/services/project/projectService.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_ENDPOINT = `${API_BASE_URL}/api/projects`;

/**
 * Obtiene todos los proyectos del portafolio.
 *
 * @returns {Promise<Array>} Lista de proyectos.
 */
export const getAllProjects = async () => {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener proyectos');
    }
    return response.json();
};

/**
 * Obtiene un proyecto por su ID.
 *
 * @param {string} id - El ID del proyecto.
 * @returns {Promise<object>} El proyecto.
 */
export const getProjectById = async (id) => {
    const response = await fetch(`${API_ENDPOINT}/${id}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener el proyecto');
    }
    return response.json();
};
