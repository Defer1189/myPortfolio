// myPortfolio/client/src/components/admin/AdminProjectCard.jsx
import PropTypes from 'prop-types';
import React from 'react';
import { FaEdit, FaEye, FaTrash, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './AdminProjectCard.css';

import Spinner from '../common/Spinner.jsx';

/**
 * Miniatura del proyecto con badge de destacado
 *
 * @param {object} param0 - Props del componente
 * @param {object} param0.project - Proyecto a mostrar
 * @returns {React.ReactElement} El componente de miniatura del proyecto
 */
const ProjectThumbnail = ({ project }) => (
    <div className='admin-project-card__thumbnail'>
        <img
            src={project.imageUrl || '/placeholder-project.jpg'}
            alt={project.title}
            onError={(e) => {
                e.target.src = '/placeholder-project.jpg';
            }}
        />
        {(project.featured || project.isFeatured) && (
            <div className='admin-project-card__badge'>
                <FaStar />
                <span>Destacado</span>
            </div>
        )}
    </div>
);
ProjectThumbnail.propTypes = {
    project: PropTypes.shape({
        imageUrl: PropTypes.string,
        title: PropTypes.string.isRequired,
        featured: PropTypes.bool,
        isFeatured: PropTypes.bool,
    }).isRequired,
};

/**
 * Detalles del proyecto
 *
 * @param {object} param0 - Props del componente
 * @param {object} param0.project - Proyecto a mostrar
 * @returns {React.ReactElement} El componente de detalles del proyecto
 */
const ProjectDetails = ({ project }) => (
    <div className='admin-project-card__details'>
        <h3 className='admin-project-card__title'>{project.title}</h3>
        {project.category && <span className='admin-project-card__category'>{project.category}</span>}
        <p className='admin-project-card__description'>
            {project.shortDescription || project.summary || 'Sin descripción'}
        </p>
        <div className='admin-project-card__meta'>
            <span className='admin-project-card__date'>{new Date(project.createdAt).toLocaleDateString('es-ES')}</span>
            {project.technologies && project.technologies.length > 0 && (
                <span className='admin-project-card__tech-count'>
                    {project.technologies.length} tecnología{project.technologies.length !== 1 ? 's' : ''}
                </span>
            )}
        </div>
    </div>
);
ProjectDetails.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        category: PropTypes.string,
        shortDescription: PropTypes.string,
        summary: PropTypes.string,
        createdAt: PropTypes.string.isRequired,
        technologies: PropTypes.array,
    }).isRequired,
};

/**
 * Acciones del proyecto
 *
 * @param {object} param0 - Props del componente
 * @param {object} param0.project - Proyecto a mostrar
 * @param {Function} param0.onDelete - Función para eliminar el proyecto
 * @param {boolean} param0.isDeleting - Estado de eliminación del proyecto
 * @returns {React.ReactElement} El componente de acciones del proyecto
 */
const ProjectActions = ({ project, onDelete, isDeleting }) => (
    <div className='admin-project-card__actions'>
        <Link
            to={`/admin/projects/edit/${project._id}`}
            className='admin-project-card__action admin-project-card__action--edit'
            aria-label={`Editar proyecto ${project.title}`}
        >
            <FaEdit />
        </Link>
        <Link
            to={`/projects/${project._id}`}
            className='admin-project-card__action admin-project-card__action--view'
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`Ver proyecto ${project.title}`}
        >
            <FaEye />
        </Link>
        <button
            className='admin-project-card__action admin-project-card__action--delete'
            onClick={() => onDelete(project)}
            disabled={isDeleting}
            aria-label={`Eliminar proyecto ${project.title}`}
        >
            {isDeleting ? <Spinner size='sm' /> : <FaTrash />}
        </button>
    </div>
);
ProjectActions.propTypes = {
    project: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    isDeleting: PropTypes.bool.isRequired,
};

/**
 * Tarjeta de proyecto para administración
 *
 * @param {object} param0 - Props del componente
 * @param {object} param0.project - Proyecto a mostrar
 * @param {Function} param0.onDelete - Función para eliminar el proyecto
 * @param {boolean} param0.isDeleting - Estado de eliminación del proyecto
 * @returns {React.ReactElement} El componente de tarjeta de proyecto
 */
const AdminProjectCard = ({ project, onDelete, isDeleting }) => (
    <article className='admin-project-card'>
        <ProjectThumbnail project={project} />
        <ProjectDetails project={project} />
        <ProjectActions project={project} onDelete={onDelete} isDeleting={isDeleting} />
    </article>
);
AdminProjectCard.propTypes = {
    project: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    isDeleting: PropTypes.bool.isRequired,
};

export default AdminProjectCard;
