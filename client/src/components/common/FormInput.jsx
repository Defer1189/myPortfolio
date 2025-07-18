// myPortfolio/client/src/components/common/FormInput.jsx
import PropTypes from 'prop-types';
import React from 'react';

// Componente auxiliar para input/textarea
const InputField = ({ isTextarea, ...props }) => {
    const commonProps = {
        id: props.id,
        name: props.name,
        value: props.value,
        onChange: props.onChange,
        onBlur: props.onBlur,
        className: props.className,
        disabled: props.disabled,
        'aria-invalid': props['aria-invalid'],
        'aria-describedby': props['aria-describedby'],
        placeholder: props.placeholder,
        maxLength: props.maxLength,
        type: props.type,
    };

    return isTextarea ? <textarea {...commonProps} rows='5' /> : <input type={props.type} {...commonProps} />;
};

// Validación de propTypes para InputField
InputField.propTypes = {
    isTextarea: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
    'aria-invalid': PropTypes.bool.isRequired,
    'aria-describedby': PropTypes.string,
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
    type: PropTypes.string.isRequired,
};

// Función principal
const FormInput = (props) => {
    const inputProps = {
        isTextarea: props.isTextarea || false,
        type: props.type || 'text',
        id: props.id,
        name: props.name,
        value: props.value,
        onChange: props.onChange,
        onBlur: props.onBlur,
        className: props.error ? 'input-error' : '',
        disabled: props.disabled,
        'aria-invalid': !!props.error,
        'aria-describedby': props.error ? `${props.id}-error` : undefined,
        placeholder: props.placeholder,
        maxLength: props.maxLength,
    };

    return (
        <div className='form-group'>
            <label htmlFor={props.id}>{props.label}</label>
            <InputField {...inputProps} />
            {props.error && (
                <p id={`${props.id}-error`} className='error-message' aria-live='assertive'>
                    {props.error}
                </p>
            )}
        </div>
    );
};

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
    placeholder: PropTypes.string,
    maxLength: PropTypes.number,
};

export default FormInput;
