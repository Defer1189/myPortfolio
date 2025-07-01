// myPortfolio/client/src/pages/contact/index.jsx
import PropTypes from 'prop-types';
import React from 'react';

import StateFeedback from '../../components/common/StateFeedback.jsx';
import ContactForm from '../../components/contact/ContactForm.jsx';
import usePageContent from '../../hooks/common/usePageContent.js';

/**
 * @typedef {object} PageSection
 * @property {string} sectionTitle - Título de la subsección.
 * @property {string} text - Texto de la sección.
 * @property {string} [image] - URL de la imagen asociada (opcional).
 */

/**
 * Componente auxiliar para renderizar las secciones de la página.
 * Extraído para reducir el conteo de líneas de ContactPage y mejorar la modularidad.
 *
 * @param {{ sections: Array<PageSection> }} props - Las props del componente.
 * @returns {React.ReactElement | null} El JSX renderizado para las secciones, o null si no hay secciones.
 */
const PageSectionsRenderer = ({ sections }) => {
    if (!sections || sections.length === 0) {
        return null; // No renderizar nada si no hay secciones
    }
    return (
        <>
            {sections.map((section, index) => (
                <div key={index} className='page-section'>
                    <h2>{section.sectionTitle}</h2>
                    <p>{section.text}</p>
                    {section.image && <img src={section.image} alt={section.sectionTitle} className='section-image' />}
                </div>
            ))}
        </>
    );
};

// Definición de PropTypes para PageSectionsRenderer
PageSectionsRenderer.propTypes = {
    // sections debe ser un array de objetos (forma más general),
    // o puedes ser más específico usando PropTypes.arrayOf(PropTypes.shape(...))
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            sectionTitle: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            image: PropTypes.string, // image es opcional
        }),
    ),
};

/**
 * Componente de la página de Contacto.
 * Muestra una introducción y el formulario de contacto, obteniendo el contenido dinámicamente desde la API.
 *
 * @returns {React.ReactElement} El componente ContactPage renderizado.
 */
function ContactPage() {
    // Usa el hook usePageContent para obtener los datos de la página 'contact'
    const { content, loading, error } = usePageContent('contact');

    // Renderizado condicional usando StateFeedback
    if (loading) {
        return <StateFeedback type='loading' message='Cargando contenido de contacto...' />;
    }

    if (error) {
        return <StateFeedback type='error' message={`Error: ${error.message}`} />;
    }

    if (!content) {
        return <StateFeedback type='empty' message='No se encontró contenido para la página de contacto.' />;
    }

    return (
        <div className='contact-page'>
            <h1>{content.title}</h1>
            <p>{content.introduction}</p>
            <ContactForm />
            {/* Renderiza secciones solo si existen y ContactPage necesita renderizarlas.
                Para ContactPage, sections probablemente será un array vacío por defecto. */}
            <PageSectionsRenderer sections={content.sections} />
        </div>
    );
}

export default ContactPage;
