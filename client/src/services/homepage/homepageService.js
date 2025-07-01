// myPortfolio/client/src/services/homepage/homepageService.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_ENDPOINT = `${API_BASE_URL}/api/homepage`;

/**
 * @description Obtiene los datos de la Homepage desde la API.
 * @returns {Promise<object>} Los datos de la Homepage.
 */

export const getUserProfile = async (signal) => {
    const response = await fetch(API_ENDPOINT, { signal });
    const data = await response.json();
    if (!response.ok) {
        const error = new Error(data.error || 'Ocurrió un error al obtener el perfil del usuario.');
        error.details = data.details;
        throw error;
    }
    return data;
};

/**
 * @description Actualiza la información del Homepage del portafolio en la API.
 * @param {object} profileData - Los datos del Homepage a actualizar.
 * @returns {Promise<object>} La respuesta del servidor.
 */

export const updateProfile = async (profileData) => {
    const response = await fetch(API_ENDPOINT, {
        method: 'POST', // O PUT para actualizaciones completas
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
    });

    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data.error || 'Ocurrió un error al actualizar el perfil.');
        error.details = data.details;
        throw error;
    }

    return data;
};
