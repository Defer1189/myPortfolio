// myPortfolio/client/src/pages/admin/projects/index.jsx
import PropTypes from 'prop-types';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './AdminProjectsPage.css';

import AdminProjectCard from '../../../components/admin/AdminProjectCard.jsx';
import ProjectsStats from '../../../components/admin/ProjectsStats.jsx';
import StateFeedback from '../../../components/common/StateFeedback.jsx';
import { useProjectsAdmin } from '../../../hooks/projects/useProjectsAdmin.js';
import { useProjectStats } from '../../../hooks/projects/useProjectStats.js';

/**
 * Encabezado de la página de administración
 *
 * @returns {React.ReactElement} Header de la página de administración
 */
const AdminPageHeader = () => (
    <header className='admin-page-header'>
        <div className='admin-page-header__content'>
            <h1>Gestión de Proyectos</h1>
            <p>Administra los proyectos de tu portafolio</p>
        </div>
        <div className='admin-page-header__actions'>
            <Link to='/admin/projects/create' className='admin-action-button admin-action-button--primary'>
                <FaPlus /> Nuevo Proyecto
            </Link>
        </div>
    </header>
);

/**
 * Componente que muestra la lista de proyectos
 *
 * @param {object} param0 - Propiedades del componente
 * @param {Array} param0.projects - Lista de proyectos
 * @param {Function} param0.onDeleteProject - Función para eliminar un proyecto
 * @param {Function} param0.isDeleting - Función para verificar si un proyecto está siendo eliminado
 * @returns {React.ReactElement} Elemento de lista de proyectos
 */
const ProjectsList = ({ projects, onDeleteProject, isDeleting }) => {
    if (projects.length === 0) {
        return (
            <div className='admin-empty-state'>
                <StateFeedback type='empty' message='No hay proyectos disponibles. ¡Crea tu primer proyecto!' />
                <Link to='/admin/projects/create' className='admin-action-button admin-action-button--primary'>
                    <FaPlus /> Crear Primer Proyecto
                </Link>
            </div>
        );
    }
    return (
        <div className='admin-projects-grid'>
            {projects.map((project) => (
                <AdminProjectCard
                    key={project._id}
                    project={project}
                    onDelete={() => onDeleteProject(project._id)}
                    isDeleting={isDeleting(project._id)}
                />
            ))}
        </div>
    );
};
ProjectsList.propTypes = {
    projects: PropTypes.array.isRequired,
    onDeleteProject: PropTypes.func.isRequired,
    isDeleting: PropTypes.func.isRequired,
};

/**
 * Página principal de administración de proyectos
 *
 * @returns {React.ReactElement} Página de administración de proyectos
 */
const AdminProjectsPage = () => {
    const { projects, refetch, deleteProject } = useProjectsAdmin();
    const stats = useProjectStats(projects);
    const handleDeleteProject = async (projectId) => {
        try {
            await deleteProject.mutate(projectId);
            refetch();
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(`Error al eliminar el proyecto ${projectId}:`, err);
        }
    };
    const isDeleting = (projectId) => deleteProject.loading && projectId === deleteProject.projectId;
    return (
        <div className='admin-projects-page'>
            <AdminPageHeader />
            {deleteProject.loading && <StateFeedback type='loading' message='Eliminando proyecto...' />}
            {deleteProject.success && <StateFeedback type='success' message='Proyecto eliminado correctamente' />}
            {deleteProject.error && <StateFeedback type='error' message={deleteProject.error} />}
            <ProjectsStats stats={stats} />
            <ProjectsList projects={projects} onDeleteProject={handleDeleteProject} isDeleting={isDeleting} />
        </div>
    );
};

export default AdminProjectsPage;
