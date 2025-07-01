// myPortfolio/client/src/components/homepage/SkillsSection.jsx
import PropTypes from 'prop-types';
import React from 'react';

const SkillsSection = ({ skills }) => {
    return (
        <section className='skills-section'>
            <h2>Habilidades</h2>
            <div className='skills-container'>
                {skills &&
                    skills.map((skill, index) => (
                        <span key={index} className='skill-item'>
                            {skill}
                        </span>
                    ))}
            </div>
        </section>
    );
};

SkillsSection.propTypes = {
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SkillsSection;
