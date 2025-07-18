// myPortfolio/client/src/components/homepage/ProjectCard.jsx
import PropTypes from 'prop-types';
import React from 'react';

const ProjectCard = ({ project }) => (
    <article
        className='project-card'
        aria-labelledby={`project-title-${project._id}`}
        aria-describedby={`project-desc-${project._id}`}
    >
        {project.imageUrl && (
            <img src={project.imageUrl} alt={`Vista previa: ${project.title}`} className='project-card-image' />
        )}
        <div className='project-card-content'>
            <h3 id={`project-title-${project._id}`}>{project.title}</h3>
            <p id={`project-desc-${project._id}`}>{project.description}</p>
            {project.projectUrl && (
                <a
                    href={project.projectUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={`Visitar ${project.title}`}
                >
                    Ver Proyecto
                </a>
            )}
        </div>
    </article>
);

ProjectCard.propTypes = {
    project: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        projectUrl: PropTypes.string,
    }).isRequired,
};

export default ProjectCard;
