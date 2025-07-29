// myPortfolio/client/src/pages/about/index.jsx
import PropTypes from 'prop-types';
import React from 'react';

import StateFeedback from '../../components/common/StateFeedback.jsx';
import { usePageContent } from '../../hooks/common/usePageContent.js';

/**
 * Componente para la página "Acerca de Mí".
 * Muestra el contenido dinámico de la página "about" desde la API.
 *
 * @returns {import('react').JSX.Element} El componente AboutPage renderizado.
 */
function AboutPage() {
    const { content: pageContent, loading, error } = usePageContent('about');

    if (loading) {
        return <StateFeedback type='loading' message='Cargando información sobre mí...' />;
    }

    if (error) {
        return <StateFeedback type='error' message={`Error al cargar la página: ${error.message}`} />;
    }

    if (!pageContent) {
        return <StateFeedback type='empty' message='No se encontró contenido para esta página.' />;
    }

    return (
        <section className='about-page'>
            <h1 className='page-title'>{pageContent.title}</h1>
            {pageContent.introduction && <p className='page-introduction'>{pageContent.introduction}</p>}
            <AboutSections sections={pageContent.sections} />
        </section>
    );
}

/**
 * Renderiza las secciones de la página Acerca de Mí.
 *
 * @param {object} props - El objeto de propiedades.
 * @param {Array} props.sections - Arreglo de objetos de sección para mostrar.
 * @returns {import('react').JSX.Element|null} Las secciones renderizadas o null si no hay ninguna.
 */
function AboutSections({ sections }) {
    if (!sections || sections.length === 0) {
        return null;
    }

    return (
        <div className='about-sections-container'>
            {sections.map((section, index) => (
                <div key={index} className='about-section-block'>
                    <h2 className='section-title'>{section.sectionTitle}</h2>
                    <p className='section-text'>{section.text}</p>
                    {section.image && (
                        <img
                            src={section.image}
                            alt={section.sectionTitle}
                            className='about-section-image'
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://placehold.co/400x200/0A192F/64FFDA?text=No+Image';
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

AboutSections.propTypes = {
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            sectionTitle: PropTypes.string,
            text: PropTypes.string,
            image: PropTypes.string,
        }),
    ),
};

AboutPage.propTypes = {};

export default AboutPage;
