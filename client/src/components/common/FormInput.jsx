// myPortfolio/client/src/components/common/FormInput.jsx
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Renderiza un campo de entrada de formulario con su etiqueta y mensaje de error.
 *
 * @param {object} props - Las propiedades del componente.
 * @param {string} props.id - El ID del campo, usado para `htmlFor` y el `id` del input.
 * @param {string} props.label - El texto de la etiqueta.
 * @param {string} [props.type] - El tipo de input (text, email, etc.).
 * @param {string} props.name - El nombre del campo.
 * @param {string} props.value - El valor del campo.
 * @param {Function} props.onChange - El manejador para el evento `onChange`.
 * @param {Function} props.onBlur - El manejador para el evento `onBlur`.
 * @param {string|null} props.error - El mensaje de error a mostrar.
 * @param {boolean} props.disabled - Si el campo está deshabilitado.
 * @param {boolean} [props.isTextarea] - Si debe renderizar un `textarea` en lugar de un `input`.
 * @returns {import('react').JSX.Element} El componente de campo de formulario.
 */
function FormInput({ id, label, type = 'text', name, value, onChange, onBlur, error, disabled, isTextarea = false }) {
    const inputProps = {
        id,
        name,
        value,
        onChange,
        onBlur,
        className: error ? 'input-error' : '',
        disabled,
        'aria-invalid': !!error,
        'aria-describedby': error ? `${id}-error` : undefined,
    };

    return (
        <div className='form-group'>
            <label htmlFor={id}>{label}</label>
            {isTextarea ? <textarea {...inputProps} rows='5'></textarea> : <input type={type} {...inputProps} />}
            {error && (
                <p id={`${id}-error`} className='error-message'>
                    {error}
                </p>
            )}
        </div>
    );
}

// Validación de propTypes
FormInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    error: PropTypes.string,
    disabled: PropTypes.bool.isRequired,
    isTextarea: PropTypes.bool,
};

export default FormInput;
