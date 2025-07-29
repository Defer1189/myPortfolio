// myPortfolio/client/src/pages/skills/index.jsx
import PropTypes from 'prop-types';

import './SkillsPage.css';

import StateFeedback from '../../components/common/StateFeedback.jsx';
import { useSkillsData } from '../../hooks/skills/useSkillsData.js';

/**
 * Página principal que muestra las habilidades del usuario.
 *
 * @returns {import('react').JSX.Element} El componente renderizado de la página de habilidades.
 */
function SkillsPage() {
    const { data: skills, loading, error } = useSkillsData();

    if (loading) {
        return <StateFeedback type='loading' message='Cargando habilidades...' />;
    }

    if (error) {
        return (
            <StateFeedback type='error' message={`Error al cargar habilidades: ${error.message || 'Desconocido'}`} />
        );
    }

    if (!skills || skills.length === 0) {
        return <StateFeedback type='empty' message='No hay habilidades disponibles en este momento.' />;
    }

    return <SkillsPageContent skills={skills} />;
}

/**
 * Renderiza el contenido principal de la página de habilidades.
 *
 * @param {object} root0 - El objeto de props.
 * @param {Array} root0.skills - Array de objetos de habilidad a mostrar.
 * @returns {import('react').JSX.Element} El contenido renderizado de la página de habilidades.
 */
function SkillsPageContent({ skills }) {
    // Agrupar habilidades por categoría
    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {});

    // Ordenar categorías
    const sortedCategories = Object.keys(skillsByCategory).sort();

    return (
        <section className='skills-page'>
            <h1 className='page-title'>Mis Habilidades</h1>
            <p className='page-introduction'>
                Aquí puedes encontrar un desglose de mis habilidades técnicas y blandas.
            </p>
            <SkillCategoryList categories={sortedCategories} skillsByCategory={skillsByCategory} />
        </section>
    );
}

/**
 * Renderiza una lista de categorías de habilidades y sus habilidades asociadas.
 *
 * @param {object} root0 - El objeto de props.
 * @param {string[]} root0.categories - Array de nombres de categorías a mostrar.
 * @param {{ [key: string]: Array }} root0.skillsByCategory - Objeto que mapea nombres de categorías a arrays de objetos de habilidad.
 * @returns {import('react').JSX.Element} La lista renderizada de categorías de habilidades y habilidades.
 */
function SkillCategoryList({ categories, skillsByCategory }) {
    return (
        <div className='skill-categories-container'>
            {categories.map((category) => (
                <div key={category} className='skill-category-group'>
                    <h2 className='category-title'>{category}</h2>
                    <ul className='skill-list'>
                        {skillsByCategory[category].map((skill) => (
                            <li key={skill._id} className='skill-item'>
                                {skill.iconUrl && (
                                    <img
                                        src={skill.iconUrl}
                                        alt={`${skill.name} icon`}
                                        className='skill-icon'
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/32x32/0A192F/64FFDA?text=Skill';
                                        }}
                                    />
                                )}
                                <span className='skill-name'>{skill.name}</span>
                                <span className='skill-level'>({skill.level})</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

SkillCategoryList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    skillsByCategory: PropTypes.object.isRequired,
};

SkillsPageContent.propTypes = {
    skills: PropTypes.array.isRequired,
};

SkillsPage.propTypes = {};

export default SkillsPage;
