// myPortfolio/client/src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import App from './App.jsx';
import AboutPage from './pages/about/index.jsx';
import NotFoundPage from './pages/common/NotFoundPage.jsx';
import ContactPage from './pages/contact/index.jsx';
import ExperiencePage from './pages/experience/index.jsx';
import Homepage from './pages/homepage/index.jsx';
import ProjectsPage from './pages/projects/index.jsx';
import ProjectDetailPage from './pages/projects/ProjectDetailPage.jsx';
import SkillsPage from './pages/skills/index.jsx';

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
                path: 'about',
                element: <AboutPage />,
            },
            {
                path: 'projects',
                element: <ProjectsPage />,
            },
            {
                path: 'projects/:id',
                element: <ProjectDetailPage />,
            },
            {
                path: 'skills',
                element: <SkillsPage />,
            },
            {
                path: 'experience',
                element: <ExperiencePage />,
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
