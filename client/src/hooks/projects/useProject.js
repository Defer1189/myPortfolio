// myPortfolio/client/src/hooks/projects/useProject.js
import { useState, useCallback, useEffect } from 'react';

import { getProjectById } from '../../services/project/projectService.js';

/**
 * Hook para obtener un proyecto por su ID.
 *
 * @param {*} projectId El ID del proyecto que se desea obtener.
 * @returns {{data: any, loading: boolean, error: string | null, refetch: Function}} Un objeto con los datos del proyecto, estado de carga, error y función para recargar.
 */
export function useProject(projectId) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(!!projectId);
    const [error, setError] = useState(null);
    const refetch = useCallback(async () => {
        if (!projectId) {
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const result = await getProjectById(projectId);
            setData(result.data || result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [projectId]);
    useEffect(() => {
        refetch();
    }, [refetch]);
    return { data, loading, error, refetch };
}
