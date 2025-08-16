// myPortfolio/client/src/components/homepage/FeaturedProjectsSection.jsx
import PropTypes from 'prop-types';

import React from 'react';

import StateFeedback from '../common/StateFeedback.jsx';

import ProjectCard from './ProjectCard.jsx';

const FeaturedProjectsSection = ({ projects }) => {
    if (!projects || projects.length === 0) {
        return (
            <section className='featured-projects-section'>
                <h2>Proyectos Destacados</h2>
                <StateFeedback type='info' message='Actualmente no hay proyectos destacados' />
            </section>
        );
    }
    return (
        <section className='featured-projects-section'>
            <h2>Proyectos Destacados</h2>
            <div className='projects-grid'>
                {projects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>
        </section>
    );
};
FeaturedProjectsSection.propTypes = {
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            shortDescription: PropTypes.string.isRequired,
            imageUrl: PropTypes.string,
            liveDemoUrl: PropTypes.string,
            githubUrl: PropTypes.string,
        }),
    ),
};
FeaturedProjectsSection.defaultProps = {
    projects: [],
};

export default FeaturedProjectsSection;
