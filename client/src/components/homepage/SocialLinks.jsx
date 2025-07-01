// myPortfolio/client/src/components/homepage/SocialLinks.jsx
import PropTypes from 'prop-types';
import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const platformIcons = {
    LinkedIn: FaLinkedin,
    GitHub: FaGithub,
};

const SocialLinks = ({ socialLinks }) => {
    return (
        <section className='social-links-section'>
            <h2>Conéctate Conmigo</h2>
            <div className='social-icons-container'>
                {socialLinks &&
                    socialLinks.map((link, index) => {
                        const IconComponent = platformIcons[link.platform];
                        return (
                            <a
                                key={index}
                                href={link.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='social-icon-link'
                                aria-label={`Enlace a ${link.platform}`}
                            >
                                {IconComponent ? <IconComponent /> : link.platform}
                            </a>
                        );
                    })}
            </div>
        </section>
    );
};

SocialLinks.propTypes = {
    socialLinks: PropTypes.arrayOf(
        PropTypes.shape({
            platform: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default SocialLinks;
