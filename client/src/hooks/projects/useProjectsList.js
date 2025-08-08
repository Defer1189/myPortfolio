// myPortfolio/client/src/hooks/projects/useProjectsList.js
import { useState, useEffect } from 'react';

import { getAllProjects } from '../../services/project/projectService.js';

/**
 * Hook para obtener la lista de proyectos.
 *
 * @returns {object} - Objeto con la lista de proyectos, estado de carga, error y función para recargar
 */
export function useProjectsList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const refetch = async () => {
        setLoading(true);
        try {
            const result = await getAllProjects();
            setData(Array.isArray(result) ? result : result.data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        refetch();
    }, []);
    return { data, loading, error, refetch };
}
