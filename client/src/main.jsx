// myPortfolio/client/src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import App from './App.jsx';
import ContactPage from './pages/contact/index.jsx';

// Definición de las rutas de la aplicación
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: (
                    <div className='card'>
                        <h2>¡Bienvenido a mi portafolio!</h2>
                        <p>Este es el inicio de tu experiencia. Navega a la sección de Contacto.</p>
                        <button>¡Explora mi portafolio!</button>
                        <p className='read-the-docs'>Click en los logos de Vite y React para aprender más.</p>
                    </div>
                ),
            },
            {
                path: 'contact',
                element: <ContactPage />,
            },
            // Puedes añadir más rutas aquí para otros proyectos, acerca de, etc.
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} /> {/* Usa RouterProvider para renderizar las rutas */}
    </StrictMode>,
);
