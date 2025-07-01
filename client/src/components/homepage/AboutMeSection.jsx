// myPortfolio/client/src/components/homepage/AboutMeSection.jsx
import PropTypes from 'prop-types';
import React from 'react';

const AboutMeSection = ({ bio }) => {
    return (
        <section className='about-me-section'>
            <h2>Sobre Mí</h2>
            <p>{bio}</p>
        </section>
    );
};

AboutMeSection.propTypes = {
    bio: PropTypes.string.isRequired,
};

export default AboutMeSection;
