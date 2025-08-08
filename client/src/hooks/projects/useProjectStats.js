// myPortfolio/client/src/hooks/projects/useProjectStats.js
import { useMemo } from 'react';

/**
 * Hook para calcular estadísticas de proyectos
 *
 * @param {*} projects - Array de proyectos para calcular las estadísticas
 * @returns {object} Objeto con estadísticas de los proyectos incluyendo total, destacados, con GitHub, con demo, categorías y proyectos recientes
 */
export const useProjectStats = (projects) => {
    const stats = useMemo(() => {
        if (!Array.isArray(projects)) {
            return {
                total: 0,
                featured: 0,
                withGitHub: 0,
                withDemo: 0,
                categories: [],
            };
        }
        const categories = [...new Set(projects.map((p) => p.category).filter(Boolean))];
        return {
            total: projects.length,
            featured: projects.filter((p) => p.featured || p.isFeatured).length,
            withGitHub: projects.filter((p) => p.githubUrl).length,
            withDemo: projects.filter((p) => p.liveDemoUrl).length,
            categories: categories.length,
            recentProjects: projects.filter((p) => {
                const projectDate = new Date(p.createdAt);
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                return projectDate > thirtyDaysAgo;
            }).length,
        };
    }, [projects]);
    return stats;
};
