// myPortfolio/client/src/hooks/common/usePageContent.js
import { useState, useEffect } from 'react';

/**
 * Define la URL base de la API usando variables de entorno de Vite.
 * Es la raíz de tu API (ej., 'http://localhost:3000').
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * @typedef {object} PageContentData - Estructura del contenido de una página.
 * @property {string} pageName - El nombre único de la página.
 * @property {string} title - El título principal de la sección.
 * @property {string} introduction - El párrafo introductorio de la sección.
 * @property {Array<object>} [sections] - Lista de bloques de contenido personalizados por página.
 * @property {string} createdAt - La fecha y hora de creación del contenido.
 * @property {string} updatedAt - La fecha y hora de la última actualización del contenido.
 */

/**
 * Realiza la llamada a la API y parsea la respuesta.
 *
 * @param {string} endpointPath - Ruta específica del endpoint (ej. '/api/content/contact').
 * @param {AbortSignal} [signal] - Señal para abortar la solicitud.
 * @returns {Promise<PageContentData>} Datos de la página.
 * @throws {Error} Si la respuesta no es exitosa o la solicitud es abortada.
 */

const fetchDataFromApi = async (endpointPath, signal) => {
    const fullUrl = `${API_BASE_URL}${endpointPath}`;
    const response = await fetch(fullUrl, { signal });

    if (!response.ok) {
        let errorMessage = `Error HTTP: ${response.status} - ${response.statusText}`;
        try {
            const errorBody = await response.json();
            if (errorBody && errorBody.message) {
                errorMessage = errorBody.message;
            } else if (errorBody && errorBody.error) {
                errorMessage = errorBody.error;
            }
        } catch (jsonErr) {
            // eslint-disable-next-line no-console
            console.warn(`No se pudo parsear error JSON para ${fullUrl}:`, jsonErr);
        }
        throw new Error(errorMessage);
    }
    return response.json();
};

/**
 * Realiza las validaciones iniciales de los parámetros del hook.
 *
 * @param {string} pageName - Nombre de la página.
 * @param {function(Error): void} setError - Setter del estado de error.
 * @param {function(boolean): void} setLoading - Setter del estado de carga.
 * @returns {boolean} True si las validaciones pasan, false en caso contrario.
 */
const performInitialChecks = (pageName, setError, setLoading) => {
    if (!pageName) {
        setError(new Error('Nombre de página requerido.'));
        setLoading(false);
        return false;
    }
    if (!API_BASE_URL) {
        setError(new Error('URL base API no configurada.'));
        setLoading(false);
        return false;
    }
    return true;
};

/**
 * Inicia el proceso de obtención de datos de la API y maneja los estados.
 *
 * @param {string} pageName - Nombre de la página.
 * @param {function(PageContentData): void} setContent - Setter del contenido.
 * @param {function(boolean): void} setLoading - Setter del estado de carga.
 * @param {function(Error | null): void} setError - Setter del estado de error.
 * @returns {function(): void} Función de limpieza para abortar la solicitud.
 */
const initiateFetchProcess = (pageName, setContent, setLoading, setError) => {
    setLoading(true);
    setError(null);
    const abortController = new AbortController();
    fetchDataFromApi(`/api/content/${pageName}`, abortController.signal)
        .then(setContent)
        .catch((err) => {
            if (err.name !== 'AbortError') {
                // eslint-disable-next-line no-console
                console.error(`Error al obtener '${pageName}':`, err);
                setError(err);
            }
        })
        .finally(() => setLoading(false));

    return () => abortController.abort();
};

/**
 * Hook reutilizable para obtener el contenido de una página específica de la API.
 *
 * @param {string} pageName - Nombre único de la página (ej. 'contact', 'about').
 * @returns {{ content: PageContentData | null, loading: boolean, error: Error | null }} Un objeto con el contenido, estado de carga y error.
 */
export const usePageContent = (pageName) => {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!performInitialChecks(pageName, setError, setLoading)) {
            return;
        }

        const cleanupFunction = initiateFetchProcess(pageName, setContent, setLoading, setError);

        return cleanupFunction;
    }, [pageName]);

    return { content, loading, error };
};
