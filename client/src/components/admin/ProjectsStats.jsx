// myPortfolio/client/src/components/admin/ProjectsStats.jsx
import PropTypes from 'prop-types';
import React from 'react';
import { FaFolder, FaStar, FaGithub, FaExternalLinkAlt, FaClock } from 'react-icons/fa';

import './ProjectsStats.css';

/**
 * Componente de tarjeta de estadística
 *
 * @param {object} param0 - Props del componente
 * @param {React.Element} param0.icon - Icono de la tarjeta
 * @param {number|string} param0.number - Número de la tarjeta
 * @param {string} param0.label - Etiqueta de la tarjeta
 * @param {object} param0.trend - Tendencia de la tarjeta
 * @returns {React.ReactElement} El componente de tarjeta de estadística
 */
const StatCard = ({ icon, number, label, trend }) => (
    <div className='stat-card'>
        <div className='stat-card__icon'>{icon}</div>
        <div className='stat-card__content'>
            <span className='stat-card__number'>{number}</span>
            <span className='stat-card__label'>{label}</span>
            {trend && <span className={`stat-card__trend stat-card__trend--${trend.type}`}>{trend.value}</span>}
        </div>
    </div>
);
StatCard.propTypes = {
    icon: PropTypes.element.isRequired,
    number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    label: PropTypes.string.isRequired,
    trend: PropTypes.shape({
        type: PropTypes.oneOf(['up', 'down', 'stable']),
        value: PropTypes.string,
    }),
};

/**
 * Genera los elementos de estadísticas
 *
 * @param {object} stats - Estadísticas de los proyectos
 * @returns {Array} Array de elementos de estadísticas
 */
const getStatItems = (stats) => [
    {
        icon: <FaFolder />,
        number: stats.total,
        label: 'Total Proyectos',
    },
    {
        icon: <FaStar />,
        number: stats.featured,
        label: 'Destacados',
    },
    {
        icon: <FaGithub />,
        number: stats.withGitHub,
        label: 'Con GitHub',
    },
    {
        icon: <FaExternalLinkAlt />,
        number: stats.withDemo,
        label: 'Con Demo',
    },
    {
        icon: <FaClock />,
        number: stats.recentProjects,
        label: 'Recientes (30d)',
    },
];

/**
 * Componente de estadísticas de proyectos
 *
 * @param {object} param0 - Props del componente
 * @param {object} param0.stats - Estadísticas de los proyectos
 * @returns {React.ReactElement} El componente de estadísticas de proyectos
 */
const ProjectsStats = ({ stats }) => {
    const statItems = getStatItems(stats);
    return (
        <div className='projects-stats'>
            <div className='projects-stats__grid'>
                {statItems.map((item, index) => (
                    <StatCard key={index} icon={item.icon} number={item.number} label={item.label} trend={item.trend} />
                ))}
            </div>
            {stats.categories > 0 && (
                <div className='projects-stats__summary'>
                    <p>
                        <strong>{stats.categories}</strong> categorías diferentes
                    </p>
                </div>
            )}
        </div>
    );
};
ProjectsStats.propTypes = {
    stats: PropTypes.shape({
        total: PropTypes.number.isRequired,
        featured: PropTypes.number.isRequired,
        withGitHub: PropTypes.number.isRequired,
        withDemo: PropTypes.number.isRequired,
        categories: PropTypes.number.isRequired,
        recentProjects: PropTypes.number.isRequired,
    }).isRequired,
};

export default ProjectsStats;
