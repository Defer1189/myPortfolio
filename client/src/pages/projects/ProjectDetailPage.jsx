// myPortfolio/client/src/pages/projects/ProjectDetailPage.jsx
import PropTypes from 'prop-types';
import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useParams, Link } from 'react-router-dom';

import './ProjectDetailPage.css';

import StateFeedback from '../../components/common/StateFeedback.jsx';
import { useProjectsData } from '../../hooks/projects/useProjectsData.js';

/**
 * Componente para la página de detalle de un proyecto.
 * Muestra la información detallada de un proyecto específico.
 *
 * @returns {import('react').JSX.Element} El componente ProjectDetailPage renderizado.
 */
function ProjectDetailPage() {
    const { id } = useParams();
    const { data: project, loading, error } = useProjectsData(id);

    if (loading) {
        return <StateFeedback type='loading' message='Cargando detalles del proyecto...' />;
    }

    if (error) {
        return <StateFeedback type='error' message={`Error al cargar el proyecto: ${error.message}`} />;
    }

    if (!project) {
        return <StateFeedback type='empty' message='Proyecto no encontrado.' />;
    }

    return <ProjectDetailSection project={project} />;
}

/**
 * Sección principal que muestra los detalles de un proyecto específico.
 *
 * @param {{ project: object }} root0 - Las props del componente.
 * @param {object} root0.project - El objeto del proyecto a mostrar.
 * @returns {import('react').JSX.Element} El componente renderizado de la sección de detalle del proyecto.
 */
function ProjectDetailSection({ project }) {
    return (
        <section className='project-detail-page'>
            <Link to='/projects' className='back-to-projects-link'>
                &larr; Volver a Proyectos
            </Link>
            <h1 className='project-detail-title'>{project.title}</h1>
            <ProjectDetailHeader project={project} />
            <ProjectDetailContent project={project} />
        </section>
    );
}

ProjectDetailSection.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        githubUrl: PropTypes.string,
        liveDemoUrl: PropTypes.string,
        longDescription: PropTypes.string,
        technologies: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.shape({
                    _id: PropTypes.string,
                    name: PropTypes.string,
                }),
            ]),
        ),
    }).isRequired,
};

/**
 * Sección de encabezado para la página de detalle del proyecto, mostrando la imagen y los enlaces del proyecto.
 *
 * @param {{ project: { imageUrl: string, title: string, githubUrl?: string, liveDemoUrl?: string } }} root0 - El objeto de props.
 * @param {object} root0.project - Los datos del proyecto para mostrar en el encabezado.
 * @returns {import('react').JSX.Element} El encabezado renderizado para el detalle del proyecto.
 */
function ProjectDetailHeader({ project }) {
    return (
        <div className='project-detail-header'>
            <ProjectImage imageUrl={project.imageUrl} title={project.title} />
            <ProjectLinks githubUrl={project.githubUrl} liveDemoUrl={project.liveDemoUrl} />
        </div>
    );
}

/**
 * Componente que muestra la imagen de un proyecto.
 *
 * @param {{ imageUrl: string, title: string }} root0 - Las props del componente.
 * @param {string} root0.imageUrl - La URL de la imagen del proyecto.
 * @param {string} root0.title - El título del proyecto.
 * @returns {import('react').JSX.Element} El componente de imagen renderizado.
 */
function ProjectImage({ imageUrl, title }) {
    return (
        <img
            src={imageUrl}
            alt={`Imagen del proyecto ${title}`}
            className='project-detail-image'
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/600x400/0A192F/64FFDA?text=No+Image';
            }}
        />
    );
}

ProjectImage.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

/**
 * Componente que muestra los enlaces de GitHub y Demo en vivo de un proyecto.
 *
 * @param {{ githubUrl?: string, liveDemoUrl?: string }} root0 - Las props del componente.
 * @param {string} [root0.githubUrl] - La URL del repositorio de GitHub del proyecto.
 * @param {string} [root0.liveDemoUrl] - La URL de la demo en vivo del proyecto.
 * @returns {import('react').JSX.Element} El componente renderizado con los enlaces del proyecto.
 */
function ProjectLinks({ githubUrl, liveDemoUrl }) {
    return (
        <div className='project-detail-links'>
            {githubUrl && (
                <a href={githubUrl} target='_blank' rel='noopener noreferrer' className='project-link github-link'>
                    <FaGithub /> Ver en GitHub
                </a>
            )}
            {liveDemoUrl && (
                <a href={liveDemoUrl} target='_blank' rel='noopener noreferrer' className='project-link demo-link'>
                    <FaExternalLinkAlt /> Demo en vivo
                </a>
            )}
        </div>
    );
}

ProjectLinks.propTypes = {
    githubUrl: PropTypes.string,
    liveDemoUrl: PropTypes.string,
};

ProjectDetailHeader.propTypes = {
    project: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        githubUrl: PropTypes.string,
        liveDemoUrl: PropTypes.string,
    }).isRequired,
};

/**
 * Componente que muestra el contenido detallado de un proyecto, incluyendo descripción y tecnologías utilizadas.
 *
 * @param {{ project: { longDescription: string, technologies: string[] } }} root0 - Las props del componente.
 * @param {object} root0.project - El objeto del proyecto que contiene la descripción y las tecnologías.
 * @returns {import('react').JSX.Element} El contenido renderizado del detalle del proyecto.
 */
function ProjectDetailContent({ project }) {
    return (
        <div className='project-detail-content'>
            <h3>Descripción</h3>
            <p>{project.longDescription}</p>

            <h3>Tecnologías Utilizadas</h3>
            <ul className='project-technologies'>
                {project.technologies &&
                    project.technologies.map((tech, index) => (
                        <li key={index} className='technology-tag'>
                            {tech.name || tech}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

ProjectDetailContent.propTypes = {
    project: PropTypes.shape({
        longDescription: PropTypes.string,
        technologies: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.shape({
                    _id: PropTypes.string,
                    name: PropTypes.string,
                }),
            ]),
        ),
    }).isRequired,
};

ProjectDetailPage.propTypes = {};

export default ProjectDetailPage;
