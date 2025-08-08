// myPortfolio/client/src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

import App from './App.jsx';
import AdminLayout from './components/common/AdminLayout.jsx';
import ProtectedRoute from './components/common/ProtectedRoute.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import AboutPage from './pages/about/index.jsx';
import AdminDashboardPage from './pages/admin/dashboard/index.jsx';
import LoginPage from './pages/admin/login/index.jsx';
import AdminProjectsPage from './pages/admin/projects/index.jsx';
import ProjectForm from './pages/admin/projects/ProjectForm.jsx';
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
    {
        path: '/admin/login',
        element: <LoginPage />,
    },
    {
        path: '/admin',
        element: <ProtectedRoute />,
        children: [
            {
                path: '',
                element: <AdminLayout />,
                children: [
                    {
                        path: 'dashboard',
                        element: <AdminDashboardPage />,
                    },
                    {
                        path: 'projects',
                        element: <AdminProjectsPage />,
                    },
                    {
                        path: 'projects/create',
                        element: <ProjectForm />,
                    },
                    {
                        path: 'projects/edit/:id',
                        element: <ProjectForm />,
                    },
                    {
                        path: '*',
                        element: <NotFoundPage />,
                    },
                ],
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>,
);
