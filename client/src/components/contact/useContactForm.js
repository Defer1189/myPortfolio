// myPortfolio/client/src/components/contact/useContactForm.js
import { useCallback } from 'react';

import { useFormState } from '../../hooks/contact/useFormState.js';
import { useFormSubmission } from '../../hooks/contact/useFormSubmission.js';
import { useFormValidation } from '../../hooks/contact/useFormValidation.js';
import { sendContactMessage } from '../../services/contact/contactService.js';

/**
 * Valida los campos del formulario.
 *
 * @param {{name: string, email: string, message: string}} formData - Los datos del formulario.
 * @returns {object} Un objeto con los errores.
 */
const contactFormValidationLogic = (formData) => {
    const newErrors = {};
    if (!formData.name.trim()) {
        newErrors.name = 'Tu nombre es requerido.';
    }
    if (!formData.email.trim()) {
        newErrors.email = 'Tu correo electrónico es requerido.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Por favor, ingresa un correo electrónico válido.';
    }
    if (!formData.message.trim()) {
        newErrors.message = 'Tu mensaje es requerido.';
    }
    return newErrors;
};

/**
 * Función para formatear el error de la API en un mensaje legible.
 *
 * @param {object} error - El objeto de error retornado por la promesa de la API.
 * @returns {string} El mensaje de error formateado.
 */
const formatApiError = (error) => {
    const details = error.details ? `: ${error.details.join(', ')}` : '';
    return `${error.message || 'Error desconocido'}${details}`;
};

const executeFormSubmission = async (e, context) => {
    e.preventDefault();
    if (context.isLoading) {
        return;
    }

    context.setErrors({});
    context.setSubmitMessage('');

    if (!context.validateFormFields()) {
        context.setSubmitMessage('Por favor, corrige los errores en el formulario.');
        return;
    }

    await context.executeSubmission(context.formData);
};

/**
 * Hook para manejar la lógica del formulario de contacto.
 * Combina hooks más pequeños para la gestión de estado, validación y envío.
 *
 * @returns {object} El estado y los manejadores para el formulario.
 */
export const useContactForm = () => {
    const { formData, handleChange, setFormData } = useFormState({ name: '', email: '', message: '' });
    const { errors, handleBlur, validateFormFields, setErrors } = useFormValidation(
        formData,
        contactFormValidationLogic,
    );

    const handleSuccess = useCallback(() => {
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
    }, [setFormData, setErrors]);

    const { isLoading, submitMessage, executeSubmission, setSubmitMessage } = useFormSubmission(
        sendContactMessage,
        formatApiError,
        handleSuccess,
    );

    const handleSubmit = useCallback(
        (e) =>
            executeFormSubmission(e, {
                isLoading,
                setErrors,
                setSubmitMessage,
                validateFormFields,
                executeSubmission,
                formData,
            }),
        [isLoading, validateFormFields, executeSubmission, formData, setErrors, setSubmitMessage],
    );

    return { formData, errors, submitMessage, isLoading, handleChange, handleBlur, handleSubmit };
};
