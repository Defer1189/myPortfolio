// myPortfolio/client/src/components/homepage/HeroSection.jsx
import PropTypes from 'prop-types';
import React from 'react';

const HeroSection = ({ name, title, profilePicture }) => {
    return (
        <section className='hero-section'>
            {profilePicture && <img src={profilePicture} alt={`${name}'s profile`} className='hero-profile-picture' />}
            <h1 className='hero-name'>{name}</h1>
            <p className='hero-title'>{title}</p>
            <button className='hero-cta-button'>Ver Proyectos</button>
        </section>
    );
};

HeroSection.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    profilePicture: PropTypes.string,
};

export default HeroSection;
