// myPortfolio/client/src/App.jsx
import { Outlet, Link } from 'react-router-dom';

import reactLogo from './assets/react.svg';

// eslint-disable-next-line import/no-absolute-path
import viteLogo from '/vite.svg';

import './App.css';

/**
 * El componente principal y layout de la aplicación.
 * Incluye la navegación, encabezado, pie de página y renderiza las rutas hijas.
 *
 * @returns {import('react').JSX.Element} El componente App renderizado.
 */
function App() {
    return (
        <>
            <nav>
                <Link to='/'>Inicio</Link> | <Link to='/contact'>Contacto</Link>
            </nav>
            <header>
                <div>
                    <a href='https://vite.dev' target='_blank' rel='noopener noreferrer'>
                        <img src={viteLogo} className='logo' alt='Vite logo' />
                    </a>
                    <a href='https://react.dev' target='_blank' rel='noopener noreferrer'>
                        <img src={reactLogo} className='logo react' alt='React logo' />
                    </a>
                </div>
                <h1>MyPortfolio</h1>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <p>&copy; 2025 Deiby Arango. Todos los derechos reservados.</p>
            </footer>
        </>
    );
}

export default App;
