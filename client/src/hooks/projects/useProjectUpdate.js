// myPortfolio/client/src/hooks/projects/useProjectUpdate.js
import { useState, useCallback } from 'react';

import { updateProject } from '../../services/project/projectService.js';

/**
 * Hook para actualizar un proyecto.
 *
 * @returns {object} - Un objeto con el estado de carga, error, éxito y función para actualizar un proyecto
 */
export function useProjectUpdate() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const mutate = useCallback(async (projectId, projectData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const result = await updateProject(projectId, projectData);
            setSuccess(true);
            return result.data || result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);
    return { loading, error, success, mutate };
}
