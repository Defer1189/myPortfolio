// myPortfolio/client/src/hooks/projects/useProjectsData.js
import { useState, useEffect, useCallback } from 'react';

import { getAllProjects, getProjectById } from '../../services/project/projectService';

/**
 * Hook para obtener datos de proyectos.
 *
 * @param {string} [projectId] - ID del proyecto específico a obtener (opcional).
 * @returns {{ data: Array|object|null, loading: boolean, error: string|null, fetchData: Function }} Un objeto que contiene los datos del proyecto, el estado de carga, el mensaje de error y una función para obtener los datos.
 */
export const useProjectsData = (projectId = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            let result;
            if (projectId) {
                result = await getProjectById(projectId);
            } else {
                result = await getAllProjects();
            }
            setData(result);
        } catch (err) {
            setError(err.message);
            // eslint-disable-next-line no-console
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    }, [projectId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, fetchData };
};
