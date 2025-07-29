// myPortfolio/client/src/services/experience/experienceService.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_ENDPOINT = `${API_BASE_URL}/api/experience`;

/**
 * Obtiene toda la experiencia del portafolio.
 *
 * @returns {Promise<Array>} Lista de entradas de experiencia.
 */
export const getAllExperience = async () => {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener experiencia');
    }
    return response.json();
};
