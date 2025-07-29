// myPortfolio/client/src/components/homepage/SkillsSection.jsx
import PropTypes from 'prop-types';
import React from 'react';

const SkillsSection = ({ skills }) => {
    return (
        <section className='skills-section'>
            <h2>Habilidades</h2>
            <div className='skills-container'>
                {skills &&
                    skills.map((skill) => (
                        <span key={skill._id} className='skill-item'>
                            {skill.name}
                        </span>
                    ))}
            </div>
        </section>
    );
};

SkillsSection.propTypes = {
    skills: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            iconUrl: PropTypes.string,
            level: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export default SkillsSection;
