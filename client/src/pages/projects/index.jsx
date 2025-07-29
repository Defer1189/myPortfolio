// myPortfolio/client/src/pages/projects/index.jsx
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './ProjectsPage.css';

import StateFeedback from '../../components/common/StateFeedback.jsx';
import ProjectCard from '../../components/homepage/ProjectCard.jsx';
import { useProjectsData } from '../../hooks/projects/useProjectsData.js';

/**
 * Componente para la página de Proyectos.
 * Muestra una lista de todos los proyectos del portafolio.
 *
 * @returns {import('react').JSX.Element} El componente ProjectsPage renderizado.
 */
function ProjectsPage() {
    const { data: projects, loading, error } = useProjectsData();

    if (loading) {
        return <StateFeedback type='loading' message='Cargando proyectos...' />;
    }

    if (error) {
        return <StateFeedback type='error' message={`Error al cargar proyectos: ${error.message || 'Desconocido'}`} />;
    }

    if (!projects || projects.length === 0) {
        return <StateFeedback type='empty' message='No hay proyectos disponibles en este momento.' />;
    }

    return (
        <section className='projects-page'>
            <h1 className='page-title'>Mis Proyectos</h1>
            <p className='page-introduction'>Explora una selección de mis trabajos más recientes y significativos.</p>
            <div className='projects-grid'>
                {projects.map((project) => (
                    <Link to={`/projects/${project._id}`} key={project._id} className='project-link-wrapper'>
                        <ProjectCard project={project} />
                    </Link>
                ))}
            </div>
        </section>
    );
}

ProjectsPage.propTypes = {};

export default ProjectsPage;
