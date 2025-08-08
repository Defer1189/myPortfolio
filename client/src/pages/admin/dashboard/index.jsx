// myPortfolio/client/src/pages/admin/dashboard/index.jsx
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { FaEdit, FaRegListAlt, FaRegUser, FaTasks } from 'react-icons/fa';

import useAuth from '../../../hooks/auth/useAuth.js';

/**
 * Componente para mostrar una tarjeta de estadísticas
 *
 * @param {object} root0 - Props del componente
 * @param {React.ReactNode} root0.icon - Icono a mostrar
 * @param {string} root0.title - Título de la tarjeta
 * @param {string|number} root0.count - Contador o valor numérico
 * @param {string} [root0.linkTo] - URL opcional para el enlace "Gestionar"
 * @returns {React.ReactElement} Componente de tarjeta de estadísticas
 */
function StatCard({ icon, title, count, linkTo }) {
    return (
        <div className='admin-stat-card'>
            <div className='admin-stat-icon'>{icon}</div>
            <div className='admin-stat-content'>
                <h3 className='admin-stat-title'>{title}</h3>
                <p className='admin-stat-count'>{count}</p>
            </div>
            {linkTo && (
                <a href={linkTo} className='admin-stat-link'>
                    Gestionar
                </a>
            )}
        </div>
    );
}

StatCard.propTypes = {
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    linkTo: PropTypes.string,
};

/**
 * Componente para mostrar acciones rápidas
 *
 * @returns {React.ReactElement} Componente de acciones rápidas
 */
function QuickActions() {
    return (
        <div className='admin-quick-actions'>
            <h2>Acciones Rápidas</h2>
            <div className='admin-actions-buttons'>
                <button className='admin-action-button'>
                    <FaRegListAlt /> Añadir Proyecto
                </button>
                <button className='admin-action-button'>
                    <FaTasks /> Añadir Habilidad
                </button>
                <button className='admin-action-button'>
                    <FaRegUser /> Añadir Experiencia
                </button>
            </div>
        </div>
    );
}

/**
 * Página principal del dashboard administrativo
 *
 * @returns {React.ReactElement} Componente de la página del dashboard administrativo
 */
function AdminDashboardPage() {
    const { user } = useAuth();

    useEffect(() => {
        document.title = 'Dashboard - Panel de Administración';
        return () => {
            document.title = 'Deiby Arango - Portfolio';
        };
    }, []);

    return (
        <div className='admin-dashboard-page'>
            <div className='admin-page-header'>
                <h1>Dashboard</h1>
                <p>Bienvenido, {user?.name || 'Administrador'}</p>
            </div>

            <div className='admin-dashboard-stats'>
                <StatCard icon={<FaRegListAlt />} title='Proyectos' count='4' linkTo='/admin/projects' />
                <StatCard icon={<FaTasks />} title='Habilidades' count='12' linkTo='/admin/skills' />
                <StatCard icon={<FaRegUser />} title='Experiencia' count='3' linkTo='/admin/experience' />
                <StatCard icon={<FaEdit />} title='Páginas' count='2' linkTo='/admin/pages' />
            </div>

            <QuickActions />
        </div>
    );
}

export default AdminDashboardPage;
