// myPortfolio/client/src/hooks/projects/useProjectFormValidation.js
import { useState, useCallback } from 'react';

/**
 * Función para validar título
 *
 * @param {string} title - El título del proyecto a validar
 * @returns {string|null} Mensaje de error si la validación falla, null si es válida
 */
const validateTitle = (title) => {
    if (!title.trim()) {
        return 'El título es obligatorio';
    }
    if (title.trim().length < 3) {
        return 'El título debe tener al menos 3 caracteres';
    }
    if (title.trim().length > 150) {
        return 'El título no puede exceder los 150 caracteres';
    }
    return null;
};

/**
 * Función para validar descripción corta
 *
 * @param {string} shortDescription - La descripción corta del proyecto a validar
 * @returns {string|null} Mensaje de error si la validación falla, null si es válida
 */
const validateShortDescription = (shortDescription) => {
    if (!shortDescription.trim()) {
        return 'La descripción corta es obligatoria';
    }
    if (shortDescription.trim().length < 10) {
        return 'La descripción corta debe tener al menos 10 caracteres';
    }
    if (shortDescription.trim().length > 300) {
        return 'La descripción corta no puede exceder los 300 caracteres';
    }
    return null;
};

/**
 * Función para validar descripción larga
 *
 * @param {string} longDescription - La descripción larga del proyecto a validar
 * @returns {string|null} Mensaje de error si la validación falla, null si es válida
 */
const validateLongDescription = (longDescription) => {
    if (!longDescription.trim()) {
        return 'La descripción completa es obligatoria';
    }
    if (longDescription.trim().length < 50) {
        return 'La descripción completa debe tener al menos 50 caracteres';
    }
    if (longDescription.trim().length > 5000) {
        return 'La descripción completa no puede exceder los 5000 caracteres';
    }
    return null;
};

/**
 * Función para validar tecnologías
 *
 * @param {string} technologies - Las tecnologías del proyecto a validar
 * @returns {string|null} Mensaje de error si la validación falla, null si es válida
 */
const validateTechnologies = (technologies) => {
    if (!technologies.trim()) {
        return 'Al menos una tecnología es requerida';
    }
    return null;
};

/**
 * Función para validar URLs
 *
 * @param {string} url - La URL a validar
 * @param {string} fieldName - El nombre del campo que contiene la URL
 * @param {boolean} isRequired - Indica si la URL es obligatoria
 * @returns {string|null} Mensaje de error si la validación falla, null si es válida
 */
const validateUrl = (url, fieldName, isRequired = false) => {
    const urlPattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
    if (!url.trim()) {
        if (isRequired) {
            if (fieldName === 'imageUrl') {
                return 'La URL de imagen es obligatoria';
            }
            if (fieldName === 'githubUrl') {
                return 'La URL de GitHub es obligatoria';
            }
        }
        return null;
    }
    if (!urlPattern.test(url)) {
        switch (fieldName) {
            case 'imageUrl':
                return 'La URL de imagen debe ser válida (ej: https://dominio.com/imagen.jpg)';
            case 'githubUrl':
                return 'La URL de GitHub debe ser válida (ej: https://github.com/usuario/proyecto)';
            case 'liveDemoUrl':
                return 'La URL de demo debe ser válida (ej: https://demo.dominio.com)';
            default:
                return 'La URL debe ser válida';
        }
    }
    return null;
};

/**
 * Validadores específicos por campo
 */
const fieldValidators = {
    title: validateTitle,
    shortDescription: validateShortDescription,
    longDescription: validateLongDescription,
    technologies: validateTechnologies,
    imageUrl: (value) => validateUrl(value, 'imageUrl', true),
    githubUrl: (value) => validateUrl(value, 'githubUrl', true),
    liveDemoUrl: (value) => validateUrl(value, 'liveDemoUrl'),
};

/**
 * Hook que retorna una función para validar un campo específico del formulario de proyecto.
 *
 * @returns {function(string, string): (string|null)} Función que valida el campo y retorna un mensaje de error o null si es válido.
 */
function useValidateField() {
    return useCallback((fieldName, value) => {
        const validator = fieldValidators[fieldName];
        return validator ? validator(value) : null;
    }, []);
}

/**
 * Hook que retorna una función para validar el formulario de proyecto.
 *
 * @param {Function} setErrors - Función para actualizar los errores del formulario.
 * @returns {function(object): boolean} Función que valida el formulario y retorna true si es válido, false si hay errores.
 */
function useValidateForm(setErrors) {
    return useCallback(
        (formData) => {
            const newErrors = {};
            Object.entries(fieldValidators).forEach(([fieldName, validator]) => {
                const error = validator(formData[fieldName] || '');
                if (error) {
                    newErrors[fieldName] = error;
                }
            });
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        },
        [setErrors],
    );
}

/**
 * Hook que retorna una función para validar un campo específico del formulario de proyecto.
 *
 * @param {Function} validateField - Función para validar un campo.
 * @param {Function} setErrors - Función para actualizar los errores del formulario.
 * @returns {function(string, string): boolean} Función que valida el campo y retorna true si es válido, false si hay errores.
 */
function useValidateSingleField(validateField, setErrors) {
    return useCallback(
        (fieldName, value) => {
            const error = validateField(fieldName, value);
            setErrors((prev) => ({ ...prev, [fieldName]: error }));
            return !error;
        },
        [validateField, setErrors],
    );
}

/**
 * Hook que retorna una función para limpiar todos los errores del formulario de proyecto.
 *
 * @param {Function} setErrors - Función para actualizar los errores del formulario.
 * @returns {function(): void} Función que limpia los errores.
 */
function useClearErrors(setErrors) {
    return useCallback(() => {
        setErrors({});
    }, [setErrors]);
}

/**
 * Hook que retorna una función para limpiar el error de un campo específico del formulario de proyecto.
 *
 * @param {Function} setErrors - Función para actualizar los errores del formulario.
 * @returns {function(string): void} Función que limpia el error del campo.
 */
function useClearFieldError(setErrors) {
    return useCallback(
        (fieldName) => {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });
        },
        [setErrors],
    );
}

/**
 * Hook que retorna una función para validar el formulario de proyecto.
 *
 * @returns {function(object): boolean} Función que valida el formulario y retorna true si es válido, false si hay errores.
 */
export const useProjectFormValidation = () => {
    const [errors, setErrors] = useState({});
    const validateField = useValidateField();
    const validateForm = useValidateForm(setErrors);
    const validateSingleField = useValidateSingleField(validateField, setErrors);
    const clearErrors = useClearErrors(setErrors);
    const clearFieldError = useClearFieldError(setErrors);
    return {
        errors,
        validateForm,
        validateSingleField,
        clearErrors,
        clearFieldError,
        setErrors,
    };
};
