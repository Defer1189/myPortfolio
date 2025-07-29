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
const ContactFormFields = ({ formData, errors, isLoading, handleChange, handleBlur }) => (
    <>
        <NameInput
            value={formData.name}
            error={errors.name}
            isLoading={isLoading}
            handleChange={handleChange}
            handleBlur={handleBlur}
        />
        <EmailInput
            value={formData.email}
            error={errors.email}
            isLoading={isLoading}
            handleChange={handleChange}
            handleBlur={handleBlur}
        />
        <MessageInput
            value={formData.message}
            error={errors.message}
            isLoading={isLoading}
            handleChange={handleChange}
            handleBlur={handleBlur}
        />
        <SubmitButton isLoading={isLoading} />
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

const NameInput = ({ value, error, isLoading, handleChange, handleBlur }) => (
    <FormInput
        id='name'
        label='Tu Nombre'
        name='name'
        placeholder='Ej: Juan Pérez'
        maxLength={100}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error}
        disabled={isLoading}
    />
);

NameInput.propTypes = {
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
};

const EmailInput = ({ value, error, isLoading, handleChange, handleBlur }) => (
    <FormInput
        id='email'
        label='Tu Correo Electrónico'
        type='email'
        name='email'
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error}
        disabled={isLoading}
    />
);

EmailInput.propTypes = {
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
};

const MessageInput = ({ value, error, isLoading, handleChange, handleBlur }) => (
    <FormInput
        id='message'
        label='Tu Mensaje'
        name='message'
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        error={error}
        disabled={isLoading}
        isTextarea={true}
    />
);

MessageInput.propTypes = {
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
};

const SubmitButton = ({ isLoading }) => (
    <button type='submit' disabled={isLoading} className='submit-button'>
        {isLoading ? 'Enviando...' : 'Enviar Mensaje'}
    </button>
);

SubmitButton.propTypes = {
    isLoading: PropTypes.bool.isRequired,
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
