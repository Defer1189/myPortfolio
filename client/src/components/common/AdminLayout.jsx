// myPortfolio/client/src/components/common/AdminLayout.jsx
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaBars, FaSignOutAlt, FaTachometerAlt, FaUserCircle } from 'react-icons/fa';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

import useAuth from '../../hooks/auth/useAuth.js';

/**
 * Componente para el encabezado del panel de administración
 *
 * @param {object} props - Propiedades del componente
 * @param {object} props.user - Información del usuario actual
 * @param {Function} props.onLogout - Función para manejar el cierre de sesión
 * @param {Function} props.toggleMenu - Función para alternar la visibilidad del menú
 * @param {boolean} props.menuOpen - Estado actual del menú (abierto/cerrado)
 * @returns {React.ReactElement} El encabezado del panel de administración
 */
const AdminHeader = ({ user, onLogout, toggleMenu, menuOpen }) => (
    <header className='admin-header'>
        <div className='admin-header-left'>
            <button
                className='admin-menu-toggle'
                onClick={toggleMenu}
                aria-expanded={menuOpen}
                aria-label='Menú de navegación'
            >
                <FaBars />
            </button>
            <h1 className='admin-title'>Panel de Administración</h1>
        </div>

        <div className='admin-user-info'>
            <div className='admin-user'>
                <FaUserCircle className='admin-user-icon' />
                <span>{user?.name || 'Admin'}</span>
            </div>
            <button onClick={onLogout} className='admin-logout-button'>
                <FaSignOutAlt />
                <span>Cerrar sesión</span>
            </button>
        </div>
    </header>
);

AdminHeader.propTypes = {
    user: PropTypes.object,
    onLogout: PropTypes.func.isRequired,
    toggleMenu: PropTypes.func.isRequired,
    menuOpen: PropTypes.bool.isRequired,
};

/**
 * Componente para la barra lateral del panel de administración
 *
 * @param {object} props - Propiedades del componente
 * @param {boolean} props.menuOpen - Estado que indica si el menú está abierto
 * @returns {React.ReactElement} La barra lateral del panel de administración
 */
const AdminSidebar = ({ menuOpen }) => (
    <aside className={`admin-sidebar ${menuOpen ? 'open' : ''}`}>
        <nav className='admin-nav'>
            <AdminNavLink to='/admin/dashboard' icon={<FaTachometerAlt />} text='Dashboard' />
            <SidebarSection title='Contenido' />
            <AdminNavLink to='/admin/projects' text='Proyectos' />
            <AdminNavLink to='/admin/skills' text='Habilidades' />
            <AdminNavLink to='/admin/experience' text='Experiencia' />
            <AdminNavLink to='/admin/pages' text='Páginas' />
            <div className='admin-sidebar-footer'>
                <Link to='/' className='view-site-link'>
                    Ver sitio público
                </Link>
            </div>
        </nav>
    </aside>
);

AdminSidebar.propTypes = {
    menuOpen: PropTypes.bool.isRequired,
};

/**
 * Layout para el panel de administración
 *
 * @returns {React.ReactElement} El componente de diseño para la sección de administración
 */
function AdminLayout() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };
    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };
    return (
        <div className='admin-layout'>
            <AdminHeader user={user} onLogout={handleLogout} toggleMenu={toggleMenu} menuOpen={menuOpen} />
            <div className='admin-container'>
                <AdminSidebar menuOpen={menuOpen} />
                <main className='admin-content'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

/**
 * Componente para secciones de la barra lateral
 *
 * @param {object} root0 - El objeto de propiedades
 * @param {string} root0.title - El título de la sección
 * @returns {React.ReactElement} El componente de sección de la barra lateral
 */
const SidebarSection = ({ title }) => (
    <div className='admin-sidebar-section'>
        <h3>{title}</h3>
    </div>
);
SidebarSection.propTypes = {
    title: PropTypes.string.isRequired,
};

/**
 * Componente para enlaces de navegación en la barra lateral
 *
 * @param {object} root0 - El objeto de propiedades
 * @param {string} root0.to - La ruta de destino del enlace
 * @param {React.ReactNode} root0.icon - El icono opcional para mostrar junto al texto
 * @param {string} root0.text - El texto del enlace
 * @returns {React.ReactElement} El componente de enlace de navegación
 */
const AdminNavLink = ({ to, icon, text }) => (
    <NavLink to={to} className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}>
        {icon && <span className='admin-nav-icon'>{icon}</span>}
        <span className='admin-nav-text'>{text}</span>
    </NavLink>
);
AdminNavLink.propTypes = {
    to: PropTypes.string.isRequired,
    icon: PropTypes.node,
    text: PropTypes.string.isRequired,
};

export default AdminLayout;
