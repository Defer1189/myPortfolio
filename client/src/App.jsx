// myPortfolio/client/src/App.jsx
import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';

import './App.css';

import DarkModeToggle from './components/common/DarkModeToggle.jsx';
import useAuth from './hooks/auth/useAuth.js';

/**
 * El componente de navegación principal.
 * Incluye enlaces a todas las secciones principales y el enlace de login.
 *
 * @returns {import('react').JSX.Element} El componente de navegación renderizado.
 */
function MainNav() {
    const { isAuthenticated } = useAuth();
    return (
        <nav className='main-nav'>
            <NavLink to='/' end>
                Inicio
            </NavLink>
            <NavLink to='/about'>Acerca de Mí</NavLink>
            <NavLink to='/experience'>Experiencia</NavLink>
            <NavLink to='/skills'>Habilidades</NavLink>
            <NavLink to='/projects'>Proyectos</NavLink>
            <NavLink to='/contact'>Contacto</NavLink>
            {!isAuthenticated && (
                <NavLink to='/admin/login' className='login-link'>
                    Login
                </NavLink>
            )}
            {isAuthenticated && (
                <NavLink to='/admin/dashboard' className='dashboard-link'>
                    Dashboard
                </NavLink>
            )}
        </nav>
    );
}

/**
 * Componente de encabezado de la aplicación que muestra el logo y el título del sitio.
 * Renderiza el logo enlazado a la página principal, el título del sitio y el botón de alternancia de modo oscuro.
 *
 * @returns {import('react').JSX.Element} El encabezado de la aplicación renderizado.
 */
function AppHeader() {
    return (
        <header className='app-header'>
            <div className='logo-title-container'>
                <LogoLink />
                <h1 className='site-title'>Deiby Arango</h1>
            </div>
            <DarkModeToggle />
        </header>
    );
}

/**
 * Componente que renderiza el logo SVG enlazado a la página principal.
 *
 * @returns {import('react').JSX.Element} El enlace con el logo SVG y texto accesible.
 */
// eslint-disable-next-line max-lines-per-function
function LogoLink() {
    return (
        <Link to='/' className='logo-link'>
            <svg
                id='Capa_2'
                data-name='Capa 2'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 576.26 325.33'
                className='site-logo'
                role='img'
                aria-labelledby='logoTitle'
            >
                <title id='logoTitle'>Deiby Arango: El Conector de Ideas</title>
                <g id='dipleIzq'>
                    <g>
                        <path
                            className='diple-left-shape'
                            d='M270.76,48.31l1.5,2.6c8.61-4.97,11.56-15.98,6.59-24.59l-2.6,1.5-2.6,1.5c3.31,5.74,1.35,13.08-4.39,16.39l1.5,2.6ZM95.2,149.67l-1.5-2.6c-12,6.93-12,24.25,0,31.18l1.5-2.6,1.5-2.6c-8-4.62-8-16.17,0-20.78l-1.5-2.6ZM270.76,277.01l-1.5,2.6c5.74,3.31,7.71,10.65,4.39,16.39l2.6,1.5,2.6,1.5c4.97-8.61,2.02-19.62-6.59-24.59l-1.5,2.6ZM266.25,314.82l-2.6-1.5c-3.31,5.74-10.65,7.71-16.39,4.39l-1.5,2.6-1.5,2.6c8.61,4.97,19.62,2.02,24.59-6.59l-2.6-1.5ZM8.55,183.36l1.5-2.6c-3.87-2.23-5.2-7.18-2.96-11.05l-2.6-1.5-2.6-1.5c-3.89,6.74-1.58,15.36,5.16,19.25l1.5-2.6ZM4.49,168.21l2.6,1.5c2.52-4.36,2.52-9.73,0-14.09l-2.6,1.5-2.6,1.5c1.45,2.5,1.45,5.59,0,8.09l2.6,1.5ZM4.49,157.12l2.6-1.5c-2.23-3.87-.91-8.82,2.96-11.05l-1.5-2.6-1.5-2.6c-6.74,3.89-9.05,12.51-5.16,19.25l2.6-1.5ZM245.76,5.01l1.5,2.6c5.74-3.31,13.08-1.35,16.39,4.39l2.6-1.5,2.6-1.5c-4.97-8.61-15.98-11.56-24.59-6.59l1.5,2.6ZM266.25,10.5l-2.6,1.5,10,17.32,2.6-1.5,2.6-1.5-10-17.32-2.6,1.5ZM8.55,141.97l1.5,2.6L247.26,7.61l-1.5-2.6-1.5-2.6L7.05,139.37l1.5,2.6ZM245.76,320.31l1.5-2.6L10.05,180.76l-1.5,2.6-1.5,2.6,237.21,136.95,1.5-2.6ZM276.25,297.5l-2.6-1.5-10,17.32,2.6,1.5,2.6,1.5,10-17.32-2.6-1.5ZM95.2,175.65l-1.5,2.6,175.56,101.36,1.5-2.6,1.5-2.6-175.56-101.36-1.5,2.6ZM270.76,48.31l-1.5-2.6-175.56,101.36,1.5,2.6,1.5,2.6,175.56-101.36-1.5-2.6ZM276.25,27.82l2.6-1.5-2.6,1.5ZM270.76,48.31l1.5,2.6-1.5-2.6ZM95.2,175.65l-1.5,2.6,1.5-2.6ZM95.2,149.67l-1.5-2.6,1.5,2.6ZM270.76,277.01l1.5-2.6-1.5,2.6ZM245.76,320.31l-1.5,2.6,1.5-2.6ZM266.25,10.5l-2.6,1.5,2.6-1.5Z'
                            fill='var(--logo-diple-left-stroke)'
                        />
                        <path
                            className='diple-left-shape'
                            d='M276.25,27.82c4.14,7.17,1.68,16.35-5.49,20.49l-175.56,101.36c-10,5.77-10,20.21,0,25.98l175.56,101.36c7.17,4.14,9.63,13.32,5.49,20.49l-10,17.32c-4.14,7.17-13.32,9.63-20.49,5.49L8.55,183.36c-5.3-3.06-7.12-9.85-4.06-15.15,1.98-3.43,1.98-7.66,0-11.09-3.06-5.3-1.25-12.09,4.06-15.15L245.76,5.01c7.17-4.14,16.35-1.68,20.49,5.49l10,17.32Z'
                            fill='var(--logo-diple-left-fill)'
                        />
                    </g>
                </g>
                <g id='dipleDer'>
                    <g>
                        <path
                            className='diple-right-shape'
                            d='M305.5,48.31l-1.5,2.6c-8.61-4.97-11.56-15.98-6.59-24.59l2.6,1.5,2.6,1.5c-3.31,5.74-1.35,13.08,4.39,16.39l-1.5,2.6ZM481.06,149.67l1.5-2.6c12,6.93,12,24.25,0,31.18l-1.5-2.6-1.5-2.6c8-4.62,8-16.17,0-20.78l1.5-2.6ZM305.5,277.01l1.5,2.6c-5.74,3.31-7.71,10.65-4.39,16.39l-2.6,1.5-2.6,1.5c-4.97-8.61-2.02-19.62,6.59-24.59l1.5,2.6ZM310.01,314.82l2.6-1.5c3.31,5.74,10.65,7.71,16.39,4.39l1.5,2.6,1.5,2.6c-8.61,4.97-19.62,2.02-24.59-6.59l2.6-1.5ZM567.71,183.36l-1.5-2.6c3.87-2.23,5.2-7.18,2.96-11.05l2.6-1.5,2.6-1.5c3.89,6.74,1.58,15.36-5.16,19.25l-1.5-2.6ZM571.77,168.21l-2.6,1.5c-2.52-4.36-2.52-9.73,0-14.09l2.6,1.5,2.6,1.5c-1.45,2.5-1.45,5.59,0,8.09l-2.6,1.5ZM571.77,157.12l-2.6-1.5c2.23-3.87.91-8.82-2.96-11.05l1.5-2.6,1.5-2.6c6.74,3.89,9.05,12.51,5.16,19.25l-2.6-1.5ZM330.5,5.01l-1.5,2.6c-5.74-3.31-13.08-1.35-16.39,4.39l-2.6-1.5-2.6-1.5c4.97-8.61,15.98-11.56,24.59-6.59l-1.5,2.6ZM310.01,10.5l2.6,1.5-10,17.32-2.6-1.5-2.6-1.5,10-17.32,2.6,1.5ZM567.71,141.97l-1.5,2.6L329,7.61l1.5-2.6,1.5-2.6,237.21,136.95-1.5,2.6ZM330.5,320.31l-1.5-2.6,237.21-136.95,1.5,2.6,1.5,2.6-237.21,136.95-1.5-2.6ZM300.01,297.5l2.6-1.5,10,17.32-2.6,1.5-2.6,1.5-10-17.32,2.6-1.5ZM481.06,175.65l1.5,2.6-175.56,101.36-1.5-2.6-1.5-2.6,175.56-101.36,1.5,2.6ZM305.5,48.31l1.5-2.6,175.56,101.36-1.5,2.6-1.5,2.6-175.56-101.36,1.5-2.6ZM300.01,27.82l-2.6-1.5,2.6,1.5ZM305.5,48.31l-1.5,2.6,1.5-2.6ZM481.06,175.65l1.5,2.6-1.5-2.6ZM481.06,149.67l1.5-2.6-1.5,2.6ZM305.5,277.01l1.5,2.6-1.5-2.6ZM330.5,320.31l1.5,2.6-1.5-2.6ZM567.71,183.36l1.5,2.6-1.5-2.6ZM567.71,141.97l-1.5,2.6,1.5-2.6ZM310.01,10.5l2.6,1.5-2.6-1.5Z'
                            fill='var(--logo-diple-right-stroke)'
                        />
                        <path
                            className='diple-right-shape'
                            d='M300.01,27.82c-4.14,7.17-1.68,16.35,5.49,20.49l175.56,101.36c10,5.77,10,20.21,0,25.98l-175.56,101.36c-7.17,4.14-9.63,13.32-5.49,20.49l10,17.32c4.14,7.17,13.32,9.63,20.49,5.49l237.21-136.95c5.3-3.06,7.12-9.85,4.06-15.15-1.98-3.43-1.98-7.66,0-11.09,3.06-5.3,1.25-12.09-4.06-15.15L330.5,5.01c-7.17-4.14-16.35-1.68-20.49,5.49l-10,17.32Z'
                            fill='var(--logo-diple-right-fill)'
                        />
                    </g>
                </g>
                <g id='inicialA'>
                    <g>
                        <path
                            className='initials-shape'
                            d='M318.59,174.52v3h20.76v-6h-20.76v3ZM328.91,143.68l-2.84-.95-10.32,30.84,2.84.95,2.84.95,10.32-30.84-2.84-.95ZM339.35,174.52l2.84-.96-10.44-30.84-2.84.96-2.84.96,10.44,30.84,2.84-.96ZM349.67,205.24l2.84-.96-5.04-14.88-2.84.96-2.84.96,5.04,14.88,2.84-.96ZM371.39,205.24v-3h-21.72v6h21.72v-3ZM340.91,121l-2.82,1.02,30.48,84.24,2.82-1.02,2.82-1.02-30.48-84.24-2.82,1.02ZM317.15,121v3h23.76v-6h-23.76v3ZM286.67,205.24l2.82,1.02,30.48-84.24-2.82-1.02-2.82-1.02-30.48,84.24,2.82,1.02ZM308.15,205.24v-3h-21.48v6h21.48v-3ZM313.19,190.36l-2.84-.96-5.04,14.88,2.84.96,2.84.96,5.04-14.88-2.84-.96ZM344.63,190.36v-3h-31.44v6h31.44v-3ZM318.59,174.52l-2.84-.95-1.32,3.95h4.17v-3ZM328.91,143.68l2.84-.96-2.86-8.44-2.83,8.45,2.84.95ZM339.35,174.52v3h4.18l-1.34-3.96-2.84.96ZM349.67,205.24l-2.84.96.69,2.04h2.15v-3ZM371.39,205.24v3h4.28l-1.45-4.02-2.82,1.02ZM340.91,121l2.82-1.02-.72-1.98h-2.1v3ZM317.15,121v-3h-2.1l-.72,1.98,2.82,1.02ZM286.67,205.24l-2.82-1.02-1.45,4.02h4.28v-3ZM308.15,205.24v3h2.15l.69-2.04-2.84-.96ZM313.19,190.36v-3h-2.15l-.69,2.04,2.84.96ZM344.63,190.36l2.84-.96-.69-2.04h-2.15v3Z'
                            fill='var(--logo-initials-stroke)'
                        />
                        <path
                            className='initials-shape'
                            d='M339.35,174.52l-10.44-30.84-10.32,30.84h20.76ZM344.63,190.36h-31.44l-5.04,14.88h-21.48l30.48-84.24h23.76l30.48,84.24h-21.72l-5.04-14.88Z'
                            fill='var(--logo-initials-fill)'
                        />
                    </g>
                </g>
                <g id='inicialD'>
                    <g>
                        <path
                            className='initials-shape'
                            d='M225.52,187.48v3h9.72v-6h-9.72v3ZM225.52,138.52h-3v48.96h6v-48.96h-3ZM235.24,138.52v-3h-9.72v6h9.72v-3ZM253.36,145l2.12-2.12c-5.02-5.02-11.91-7.36-20.24-7.36v6c7.19,0,12.38,1.99,16,5.6l2.12-2.12ZM259.84,163.12h3c0-8.33-2.33-15.22-7.36-20.24l-2.12,2.12-2.12,2.12c3.62,3.62,5.6,8.81,5.6,16h3ZM253.36,181.12l2.1,2.14c5.05-4.95,7.38-11.81,7.38-20.14h-6c0,7.19-1.99,12.33-5.58,15.86l2.1,2.14ZM235.24,187.48v3c8.31,0,15.19-2.29,20.22-7.22l-2.1-2.14-2.1-2.14c-3.61,3.55-8.81,5.5-16.02,5.5v3ZM205,121v3h31.56v-6h-31.56v3ZM205,205.24h3v-84.24h-6v84.24h3ZM236.56,205.24v-3h-31.56v6h31.56v-3ZM259.72,199.96l-1.41-2.65c-6.14,3.25-13.36,4.93-21.75,4.93v6c9.21,0,17.42-1.84,24.57-5.63l-1.41-2.65ZM275.2,185.08l-2.61-1.47c-3.31,5.88-8.03,10.43-14.26,13.69l1.39,2.66,1.39,2.66c7.22-3.78,12.81-9.14,16.7-16.07l-2.61-1.47ZM280.72,163.12h-3c0,7.78-1.73,14.57-5.12,20.46l2.6,1.5,2.6,1.5c3.97-6.91,5.92-14.75,5.92-23.46h-3ZM275.2,141.16l-2.59,1.51c3.38,5.8,5.11,12.59,5.11,20.45h6c0-8.78-1.95-16.63-5.93-23.47l-2.59,1.51ZM259.84,126.28l-1.41,2.65c6.14,3.26,10.84,7.81,14.15,13.7l2.61-1.47,2.61-1.47c-3.89-6.91-9.43-12.28-16.57-16.06l-1.41,2.65ZM236.56,121v3c8.48,0,15.74,1.68,21.87,4.93l1.41-2.65,1.41-2.65c-7.15-3.79-15.4-5.63-24.69-5.63v3ZM225.52,187.48h-3v3h3v-3ZM225.52,138.52v-3h-3v3h3ZM205,121v-3h-3v3h3ZM205,205.24h-3v3h3v-3ZM259.72,199.96l-1.39-2.66h0s0,0,0,0l1.41,2.65ZM275.2,185.08l-2.6-1.5h0s0,.02,0,.02l2.61,1.47ZM275.2,141.16l-2.61,1.47v.02s.02.02.02.02l2.59-1.51ZM259.84,126.28l1.41-2.65-1.41,2.65Z'
                            fill='var(--logo-initials-stroke)'
                        />
                        <path
                            className='initials-shape'
                            d='M235.24,187.48c7.76,0,13.8-2.12,18.12-6.36s6.48-10.24,6.48-18-2.16-13.8-6.48-18.12-10.36-6.48-18.12-6.48h-9.72v48.96h9.72ZM236.56,121c8.88,0,16.64,1.76,23.28,5.28,6.64,3.52,11.76,8.48,15.36,14.88,3.68,6.32,5.52,13.64,5.52,21.96s-1.84,15.56-5.52,21.96c-3.6,6.4-8.76,11.36-15.48,14.88-6.64,3.52-14.36,5.28-23.16,5.28h-31.56v-84.24h31.56Z'
                            fill='var(--logo-initials-fill)'
                        />
                    </g>
                </g>
                <g id='chispaSup'>
                    <polygon
                        className='chispas-shape'
                        points='409.21 10.07 404.73 26.8 392.48 14.55 409.21 10.07'
                        fill='var(--logo-chispas-fill)'
                    />
                </g>
                <g id='chispaMed'>
                    <rect
                        className='chispas-shape'
                        x='408'
                        y='158'
                        width='15'
                        height='10'
                        fill='var(--logo-chispas-fill)'
                    />
                </g>
                <g id='chispaInf'>
                    <polygon
                        className='chispas-shape'
                        points='409.21 315.21 392.48 310.73 404.73 298.48 409.21 315.21'
                        fill='var(--logo-chispas-fill)'
                    />
                </g>
            </svg>
            <span className='sr-only'>El Conector de Ideas</span>
        </Link>
    );
}

/**
 * Componente principal de contenido que renderiza las rutas hijas dentro del layout.
 *
 * @returns {import('react').JSX.Element} El contenido principal de la aplicación renderizado.
 */
function MainContent() {
    return (
        <main className='app-main-content'>
            <Outlet />
        </main>
    );
}

/**
 * Componente de pie de página de la aplicación que muestra los derechos de autor.
 *
 * @returns {import('react').JSX.Element} El pie de página de la aplicación renderizado.
 */
function AppFooter() {
    return (
        <footer className='app-footer'>
            <p>&copy; {new Date().getFullYear()} Deiby Arango. Todos los derechos reservados.</p>
        </footer>
    );
}

/**
 * Componente raíz de la aplicación que organiza la navegación, encabezado, contenido principal y pie de página.
 *
 * @returns {import('react').JSX.Element} El componente App renderizado.
 */
function App() {
    return (
        <>
            <MainNav />
            <AppHeader />
            <MainContent />
            <AppFooter />
        </>
    );
}

export default App;
