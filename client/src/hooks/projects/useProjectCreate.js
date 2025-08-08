// myPortfolio/client/src/hooks/projects/useProjectCreate.js
import { useState, useCallback } from 'react';

import { createProject } from '../../services/project/projectService.js';

/**
 * Hook para crear un nuevo proyecto.
 *
 * @returns {object} - Un objeto con el estado de carga, error, éxito y función para crear un proyecto
 */
export function useProjectCreate() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const mutate = useCallback(async (projectData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const result = await createProject(projectData);
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
