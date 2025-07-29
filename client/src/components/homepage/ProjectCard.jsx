// myPortfolio/client/src/components/homepage/ProjectCard.jsx
import PropTypes from 'prop-types';
import React from 'react';

const ProjectImageTitle = ({ project }) => (
    <div className='project-card-image-title'>
        <img src={project.imageUrl} alt={`Imagen del proyecto ${project.title}`} className='project-image' />
        <div className='project-info'>
            <h3 id={`project-title-${project._id}`} className='project-title'>
                {project.title}
            </h3>
        </div>
    </div>
);

ProjectImageTitle.propTypes = {
    project: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
    }).isRequired,
};

const ProjectCardActions = ({ project }) => (
    <div className='project-card-actions'>
        {project.liveDemoUrl && (
            <button
                type='button'
                onClick={() => window.open(project.liveDemoUrl, '_blank', 'noopener noreferrer')}
                aria-label={`Ver demostración en vivo de ${project.title}`}
                className='button project-action-button'
            >
                Demo
            </button>
        )}
        {project.githubUrl && (
            <button
                type='button'
                onClick={() => window.open(project.githubUrl, '_blank', 'noopener noreferrer')}
                aria-label={`Ver código en GitHub de ${project.title}`}
                className='button project-action-button'
            >
                GitHub
            </button>
        )}
    </div>
);

ProjectCardActions.propTypes = {
    project: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        liveDemoUrl: PropTypes.string,
        githubUrl: PropTypes.string,
    }).isRequired,
};

const ProjectCard = ({ project }) => {
    return (
        <article className='project-card' aria-labelledby={`project-title-${project._id}`}>
            <ProjectImageTitle project={project} />
            <div className='project-description-and-links'>
                <p className='project-description'>{project.shortDescription}</p>
                <ProjectCardActions project={project} />
            </div>
        </article>
    );
};

ProjectCard.propTypes = {
    project: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        shortDescription: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        liveDemoUrl: PropTypes.string,
        githubUrl: PropTypes.string,
    }).isRequired,
};

export default ProjectCard;
