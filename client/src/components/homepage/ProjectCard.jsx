// myPortfolio/client/src/components/homepage/ProjectCard.jsx
import PropTypes from 'prop-types';
import React from 'react';

const ProjectCard = ({ project }) => {
    return (
        <div className='project-card'>
            {project.imageUrl && <img src={project.imageUrl} alt={project.title} className='project-card-image' />}
            <div className='project-card-content'>
                <h3 className='project-card-title'>{project.title}</h3>
                <p className='project-card-description'>{project.description}</p>
                {project.projectUrl && (
                    <a
                        href={project.projectUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='project-card-link'
                    >
                        Ver Proyecto
                    </a>
                )}
            </div>
        </div>
    );
};

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
