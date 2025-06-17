// myPortfolio/client/src/hooks/contact/useFormState.js
import { useState, useCallback } from 'react';

/**
 * Hook para manejar el estado y la lógica del formulario.
 *
 * @param {object} initialValues - Los valores iniciales del formulario.
 * @returns {object} Un objeto con el estado del formulario y manejadores.
 */
export const useFormState = (initialValues) => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const resetForm = useCallback(() => {
        setFormData(initialValues);
    }, [initialValues]);

    return {
        formData,
        handleChange,
        resetForm,
        setFormData,
    };
};
