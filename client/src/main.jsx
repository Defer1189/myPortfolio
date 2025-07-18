// myPortfolio/client/src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import App from './App.jsx';
import NotFoundPage from './pages/common/NotFoundPage.jsx';
import ContactPage from './pages/contact/index.jsx';
import Homepage from './pages/homepage/index.jsx';

// Definición de las rutas de la aplicación
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Homepage />,
            },
            {
                path: 'contact',
                element: <ContactPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
);
