// myPortfolio/client/src/components/contact/ContactForm.jsx
import PropTypes from 'prop-types';
import React from 'react';

import './ContactForm.css';

import FormInput from '../common/FormInput.jsx';

import { useContactForm } from './useContactForm.js';

/**
 * Componente auxiliar para renderizar los campos del formulario y el botón de envío.
 *
 * @param {object} props - Propiedades del componente.
 * @param {object} props.formData - Datos del formulario.
 * @param {object} props.errors - Errores de validación.
 * @param {boolean} props.isLoading - Estado de carga del formulario.
 * @param {Function} props.handleChange - Manejador de cambio de input.
 * @param {Function} props.handleBlur - Manejador de desenfoque de input.
 * @returns {import('react').JSX.Element} El JSX del formulario.
 */
/* eslint-disable-next-line max-lines-per-function */
const ContactFormFields = ({ formData, errors, isLoading, handleChange, handleBlur }) => (
    <>
        <FormInput
            id='name'
            label='Tu Nombre'
            name='name'
            placeholder='Ej: Juan Pérez'
            maxLength={100}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            disabled={isLoading}
        />
        <FormInput
            id='email'
            label='Tu Correo Electrónico'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            disabled={isLoading}
        />
        <FormInput
            id='message'
            label='Tu Mensaje'
            name='message'
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.message}
            disabled={isLoading}
            isTextarea={true}
        />
        <button type='submit' disabled={isLoading} className='submit-button'>
            {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
    </>
);

ContactFormFields.propTypes = {
    formData: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
    }).isRequired,
    errors: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        message: PropTypes.string,
    }).isRequired,
    isLoading: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
};

/**
 * Renderiza la UI para el formulario de contacto.
 *
 * @returns {import('react').JSX.Element} El componente del formulario.
 */
function ContactForm() {
    const { formData, errors, submitMessage, isLoading, handleChange, handleBlur, handleSubmit } = useContactForm();
    return (
        <form className='contact-form' onSubmit={handleSubmit} noValidate aria-label='Formulario de contacto'>
            <ContactFormFields
                formData={formData}
                errors={errors}
                isLoading={isLoading}
                handleChange={handleChange}
                handleBlur={handleBlur}
            />
            {submitMessage && (
                <div
                    role={submitMessage.includes('Error') ? 'alert' : 'status'}
                    aria-live='assertive'
                    className={`submit-feedback ${submitMessage.includes('Error') ? 'error' : 'success'}`}
                >
                    {submitMessage}
                </div>
            )}
        </form>
    );
}

export default ContactForm;
