// myPortfolio/client/src/pages/experience/index.jsx
import PropTypes from 'prop-types';
import React from 'react';

import StateFeedback from '../../components/common/StateFeedback.jsx';
import { useExperienceData } from '../../hooks/experience/useExperienceData.js';

/**
 * Componente para la página de Experiencia.
 * Muestra la experiencia profesional, educativa y certificaciones.
 *
 * @returns {import('react').JSX.Element} El componente ExperiencePage renderizado.
 */
function ExperiencePage() {
    const { data: experience, loading, error } = useExperienceData();

    if (loading) {
        return <StateFeedback type='loading' message='Cargando experiencia...' />;
    }

    if (error) {
        return <StateFeedback type='error' message={`Error al cargar experiencia: ${error.message}`} />;
    }

    if (!experience || experience.length === 0) {
        return <StateFeedback type='empty' message='No hay experiencia disponible en este momento.' />;
    }

    return (
        <section className='experience-page'>
            <h1 className='page-title'>Mi Experiencia</h1>
            <p className='page-introduction'>
                Un vistazo a mi trayectoria profesional, formación académica y certificaciones.
            </p>
            <ExperienceTimeline experience={experience} />
        </section>
    );
}

/**
 * Formatea una fecha en formato legible en español, o devuelve 'Actual' si no hay fecha.
 *
 * @param {string|null|undefined} dateString - La fecha en formato ISO o null/undefined si es actual.
 * @returns {string} La fecha formateada en español o 'Actual' si no hay fecha.
 */
function formatDate(dateString) {
    if (!dateString) {
        return 'Actual';
    }
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

/**
 * Componente que muestra la línea de tiempo de experiencia.
 *
 * @param {{experience: Array<object>}} props - Las propiedades del componente.
 * @param {Array<object>} props.experience - Lista de objetos de experiencia profesional, educativa y certificaciones.
 * @returns {import('react').JSX.Element} El componente renderizado de la línea de tiempo de experiencia.
 */
function ExperienceTimeline({ experience }) {
    return (
        <div className='experience-timeline'>
            <div className='timeline-vertical-line'></div>
            {experience.map((entry) => (
                <div key={entry._id} className={`experience-entry ${entry.type}`}>
                    <div className='experience-header'>
                        <h3 className='entry-title'>{entry.title}</h3>
                        <span className='experience-dates'>
                            {formatDate(entry.startDate)} - {formatDate(entry.endDate)}
                        </span>
                    </div>
                    <p className='experience-organization'>
                        {entry.company && <span>{entry.company}</span>}
                        {entry.institution && <span>{entry.institution}</span>}
                        {entry.location && <span className='experience-location'> | {entry.location}</span>}
                    </p>
                    {entry.description && <p className='experience-description'>{entry.description}</p>}
                </div>
            ))}
        </div>
    );
}

ExperienceTimeline.propTypes = {
    experience: PropTypes.arrayOf(PropTypes.object).isRequired,
};

ExperiencePage.propTypes = {};

export default ExperiencePage;
