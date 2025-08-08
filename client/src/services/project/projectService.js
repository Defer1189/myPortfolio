// myPortfolio/client/src/services/project/projectService.js
import { getToken } from '../auth/tokenService.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_ENDPOINT = `${API_BASE_URL}/api/projects`;

/**
 * Obtiene todos los proyectos del portafolio.
 *
 * @returns {Promise<Array>} Lista de proyectos.
 */
export const getAllProjects = async () => {
    try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener proyectos');
        }
        return response.json();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error en getAllProjects:', error);
        throw error;
    }
};

/**
 * Obtiene un proyecto por su ID.
 *
 * @param {string} id - El ID del proyecto.
 * @returns {Promise<object>} El proyecto.
 */
export const getProjectById = async (id) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/${id}`);
        const contentType = response.headers.get('content-type');
        if (!response.ok) {
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener el proyecto');
            } else {
                const errorText = await response.text();
                throw new Error(errorText || `Error al obtener el proyecto (${response.status})`);
            }
        }
        if (contentType && contentType.includes('application/json')) {
            const json = await response.json();
            return json.data !== undefined ? json.data : json;
        } else {
            throw new Error('Respuesta inesperada del servidor');
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error en getProjectById (${id}):`, error);
        throw error;
    }
};

/**
 * Crea un nuevo proyecto.
 *
 * @param {object} projectData - Datos del proyecto a crear.
 * @returns {Promise<object>} El proyecto creado.
 */
export const createProject = async (projectData) => {
    const token = getToken();
    if (!token) {
        throw new Error('No estás autenticado para crear un proyecto');
    }
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(projectData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al crear el proyecto');
        }
        return response.json();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error en createProject:', error);
        throw error;
    }
};

/**
 * Actualiza un proyecto existente.
 *
 * @param {string} id - El ID del proyecto a actualizar.
 * @param {object} projectData - Los nuevos datos del proyecto.
 * @returns {Promise<object>} El proyecto actualizado.
 */
export const updateProject = async (id, projectData) => {
    const token = getToken();
    if (!token) {
        throw new Error('No estás autenticado para actualizar un proyecto');
    }
    try {
        const response = await fetch(`${API_ENDPOINT}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(projectData),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar el proyecto');
        }
        return response.json();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error en updateProject (${id}):`, error);
        throw error;
    }
};

/**
 * Elimina un proyecto existente.
 *
 * @param {string} id - El ID del proyecto a eliminar.
 * @returns {Promise<boolean>} Devuelve una promesa que resuelve a true si el proyecto fue eliminado correctamente.
 */
export const deleteProject = async (id) => {
    const token = getToken();
    if (!token) {
        throw new Error('No estás autenticado para eliminar un proyecto');
    }
    try {
        const response = await fetch(`${API_ENDPOINT}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al eliminar el proyecto');
        }
        return true;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error en deleteProject (${id}):`, error);
        throw error;
    }
};

/**
 * Obtiene proyectos destacados
 *
 * @returns {Promise<Array>} Lista de proyectos destacados.
 */
export const getFeaturedProjects = async () => {
    try {
        const response = await fetch(`${API_ENDPOINT}/featured`);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener proyectos destacados');
        }
        return response.json();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error en getFeaturedProjects:', error);
        throw error;
    }
};
