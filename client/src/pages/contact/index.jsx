// myPortfolio/client/src/pages/ContactPage/index.jsx

import React from 'react';

import ContactForm from '../../components/contact/ContactForm.jsx';

/**
 * Componente de la página de Contacto.
 * Muestra una introducción y el formulario de contacto.
 *
 * @returns {import('react').JSX.Element} El componente ContactPage renderizado.
 */
function ContactPage() {
    return (
        <div className='contact-page'>
            <h1>Contáctame</h1>
            <p>
                ¡Estoy siempre abierto a nuevas oportunidades, colaboraciones o simplemente para charlar! Si tienes
                alguna pregunta, propuesta de proyecto o deseas conocer más sobre mi trabajo, no dudes en enviarme un
                mensaje.
            </p>
            <ContactForm />
        </div>
    );
}

export default ContactPage;
