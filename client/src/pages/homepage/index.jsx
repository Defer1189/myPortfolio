// myPortfolio/client/src/pages/homepage/index.jsx
import React from 'react';

import StateFeedback from '../../components/common/StateFeedback';
import AboutMeSection from '../../components/homepage/AboutMeSection.jsx';
import FeaturedProjectsSection from '../../components/homepage/FeaturedProjectsSection.jsx';
import HeroSection from '../../components/homepage/HeroSection.jsx';
import '../../components/homepage/HomePage.css';
import SkillsSection from '../../components/homepage/SkillsSection.jsx';
import SocialLinks from '../../components/homepage/SocialLinks.jsx';
import useHomepageData from '../../hooks/homepage/useHomepageData.js';

const Homepage = () => {
    const { profile, loading, error } = useHomepageData();
    if (loading) {
        return <StateFeedback type='loading' />;
    }
    if (error) {
        return <StateFeedback type='error' message={`Error: ${error}`} />;
    }
    if (!profile) {
        return <StateFeedback type='empty' message='No se encontró información de perfil.' />;
    }

    return (
        <div className='homepage'>
            <HeroSection name={profile.name} title={profile.title} profilePicture={profile.profilePicture} />
            <AboutMeSection bio={profile.bio} />
            <SkillsSection skills={profile.skills} />
            <FeaturedProjectsSection projects={profile.featuredProjects || []} />
            <SocialLinks socialLinks={profile.socialLinks || []} />
        </div>
    );
};

export default Homepage;
