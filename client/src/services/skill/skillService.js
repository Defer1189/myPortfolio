// myPortfolio/client/src/services/skill/skillService.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_ENDPOINT = `${API_BASE_URL}/api/skills`;

/**
 * Obtiene todas las habilidades del portafolio.
 *
 * @returns {Promise<Array>} Lista de habilidades.
 */
export const getAllSkills = async () => {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener habilidades');
    }
    return response.json();
};
