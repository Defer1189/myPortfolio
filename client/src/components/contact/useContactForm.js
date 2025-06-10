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

/**
 * Hook para manejar la lógica del formulario de contacto.
 * Combina hooks más pequeños para la gestión de estado, validación y envío.
 *
 * @returns {object} El estado y los manejadores para el formulario.
 */
/* eslint-disable-next-line max-lines-per-function */
export const useContactForm = () => {
    // 1. Manejo del estado del formulario
    const { formData, handleChange, setFormData } = useFormState({ name: '', email: '', message: '' });

    // 2. Manejo de la validación
    const { errors, handleBlur, validateFormFields, setErrors } = useFormValidation(
        formData,
        contactFormValidationLogic,
    );

    // Callback para limpiar el formulario después del éxito del envío
    const handleSuccess = useCallback(() => {
        setFormData({ name: '', email: '', message: '' }); // Limpiar formData del hook useFormState
        setErrors({}); // Limpiar errores del hook useFormValidation
    }, [setFormData, setErrors]); // Dependencias: setters de estado

    // 3. Manejo del envío a la API
    const { isLoading, submitMessage, executeSubmission, setSubmitMessage } = useFormSubmission(
        sendContactMessage,
        formatApiError,
        handleSuccess,
    );

    // Función principal de envío
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();

            // Limpiar errores si el usuario intenta enviar de nuevo sin interactuar
            setErrors({});
            setSubmitMessage(''); // <-- Limpiar el mensaje de envío al intentar enviar de nuevo

            const isValid = validateFormFields(); // Valida todo el formulario
            if (!isValid) {
                // Si hay errores, establece un mensaje general y no continúa
                setSubmitMessage('Por favor, corrige los errores en el formulario.');
                return;
            }

            // Si es válido, ejecuta el envío
            await executeSubmission(formData);
        },
        [validateFormFields, executeSubmission, formData, setErrors, setSubmitMessage], // <-- Dependencia de setSubmitMessage es correcta
    ); // Dependencias

    return { formData, errors, submitMessage, isLoading, handleChange, handleBlur, handleSubmit };
};
