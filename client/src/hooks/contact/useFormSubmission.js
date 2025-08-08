// myPortfolio/client/src/hooks/contact/useFormSubmission.js
import { useState, useCallback } from 'react';

/**
 * Hook para manejar el estado y la lógica de envío de datos a la API.
 *
 * @param {Function} apiCall - La función asíncrona que realiza la llamada a la API.
 * @param {Function} formatError - La función para formatear errores.
 * @param {Function} [onSuccess] - Callback opcional para ejecutar en caso de éxito.
 * @returns {object} Un objeto con el estado de carga, mensaje de envío, y la función de envío.
 */
export const useFormSubmission = (apiCall, formatError, onSuccess) => {
    const [isLoading, setIsLoading] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const executeSubmission = useCallback(
        async (dataToSubmit) => {
            setIsLoading(true);
            setSubmitMessage('');
            try {
                const response = await apiCall(dataToSubmit);
                setSubmitMessage(response.message || 'Operación completada con éxito.');
                if (onSuccess) {
                    onSuccess(response);
                }
            } catch (error) {
                setSubmitMessage(formatError(error));
            } finally {
                setIsLoading(false);
            }
        },
        [apiCall, formatError, onSuccess],
    );
    return {
        isLoading,
        submitMessage,
        executeSubmission,
        setSubmitMessage,
    };
};
