// myPortfolio/client/src/hooks/contact/useFormValidation.js
import { useState, useCallback } from 'react';
import React from 'react';

/**
 * Hook para manejar la validación del formulario.
 *
 * @param {object} formData - Los datos actuales del formulario a validar.
 * @param {(data: object) => object} validationLogic - La función de validación que retorna un objeto de errores.
 * @returns {{
 * errors: object,
 * handleBlur: (e: import('react').FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
 * validateFormFields: () => boolean,
 * setErrors: React.Dispatch<React.SetStateAction<object>>
 * }} Un objeto con los errores, el manejador de blur y la función de validación completa.
 */
export const useFormValidation = (formData, validationLogic) => {
    const [errors, setErrors] = useState({});

    const handleBlur = useCallback(
        (e) => {
            const { name } = e.target;
            const tempFormData = { ...formData, [name]: formData[name] || '' };
            const newErrors = validationLogic(tempFormData);
            if (newErrors[name]) {
                setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
            } else {
                setErrors((prev) => {
                    const updatedErrors = { ...prev };
                    delete updatedErrors[name];
                    return updatedErrors;
                });
            }
        },
        [formData, validationLogic],
    );

    const validateFormFields = useCallback(() => {
        const validationErrors = validationLogic(formData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    }, [formData, validationLogic]);

    return { errors, handleBlur, validateFormFields, setErrors };
};
