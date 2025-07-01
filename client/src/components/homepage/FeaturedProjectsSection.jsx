// myPortfolio/client/src/components/homepage/FeaturedProjectsSection.jsx
import PropTypes from 'prop-types';

import React from 'react';

import ProjectCard from './ProjectCard.jsx';

const FeaturedProjectsSection = ({ projects }) => {
    return (
        <section className='featured-projects-section'>
            <h2>Proyectos Destacados</h2>
            <div className='projects-grid'>
                {projects && projects.map((project) => <ProjectCard key={project._id} project={project} />)}
            </div>
        </section>
    );
};

FeaturedProjectsSection.propTypes = {
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            imageUrl: PropTypes.string,
            projectUrl: PropTypes.string,
        }),
    ).isRequired,
};

export default FeaturedProjectsSection;
