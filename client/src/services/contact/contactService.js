// myPortfolio/client/src/services/contact/contactService.js

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_ENDPOINT = `${API_BASE_URL}/api/contact`;

/**
 * Envía los datos del formulario de contacto a la API.
 *
 * @param {{name: string, email: string, message: string}} formData - Los datos del formulario.
 * @returns {Promise<object>} La respuesta del servidor en formato JSON.
 */
export const sendContactMessage = async (formData) => {
    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
        // Lanza un error con el mensaje y detalles del servidor para que el hook lo maneje.
        const error = new Error(data.error || 'Ocurrió un error en la solicitud.');
        error.details = data.details;
        throw error;
    }

    return data;
};
