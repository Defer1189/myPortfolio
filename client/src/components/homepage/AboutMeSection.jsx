// myPortfolio/client/src/components/homepage/AboutMeSection.jsx
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const AboutMeSection = ({ bio }) => {
    return (
        <section className='about-me-section'>
            <h2>Sobre Mí</h2>
            <p>{bio}</p>
            <p className='about-me-discover'>
                Descubre más{' '}
                <Link to='/about' className='inline-link'>
                    sobre mi historia
                </Link>{' '}
                y explora{' '}
                <Link to='/experience' className='inline-link'>
                    mi trayectoria profesional
                </Link>
                .
            </p>
        </section>
    );
};

AboutMeSection.propTypes = {
    bio: PropTypes.string.isRequired,
};

export default AboutMeSection;
