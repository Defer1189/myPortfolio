// myPortfolio/client/src/pages/homepage/index.jsx
import React from 'react';

import StateFeedback from '../../components/common/StateFeedback.jsx';
import AboutMeSection from '../../components/homepage/AboutMeSection.jsx';
import FeaturedProjectsSection from '../../components/homepage/FeaturedProjectsSection.jsx';
import HeroSection from '../../components/homepage/HeroSection.jsx';
import '../../components/homepage/HomePage.css';
import SkillsSection from '../../components/homepage/SkillsSection.jsx';
import SocialLinks from '../../components/homepage/SocialLinks.jsx';
import useHomepageData from '../../hooks/homepage/useHomepageData.js';

const Homepage = () => {
    const { profile, loading, error } = useHomepageData();
    if (profile) {
        // eslint-disable-next-line no-console
        console.log('Datos del perfil cargados:', profile);
        // eslint-disable-next-line no-console
        console.log('Habilidades:', profile.skills);
        // eslint-disable-next-line no-console
        console.log('Proyectos Destacados:', profile.featuredProjects);
        // eslint-disable-next-line no-console
        console.log('Datos de usuario (desde profile.user):', profile.user);
    }
    if (loading) {
        return <StateFeedback type='loading' />;
    }
    if (error) {
        return <StateFeedback type='error' message={`Error: ${error.message}`} />;
    }
    if (!profile) {
        return <StateFeedback type='empty' message='No se encontró información de perfil.' />;
    }

    const { name, title, bio, profilePicture, socialLinks } = profile.user || {};

    return (
        <div className='homepage'>
            <HeroSection name={name} title={title} profilePicture={profilePicture} />
            <AboutMeSection bio={bio} />
            <SkillsSection skills={profile.skills} />
            <FeaturedProjectsSection projects={profile.featuredProjects || []} />
            <SocialLinks socialLinks={socialLinks || []} />
        </div>
    );
};

export default Homepage;
