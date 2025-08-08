// myPortfolio/client/src/hooks/projects/useProjectDelete.js
import { useState, useCallback } from 'react';

import { deleteProject } from '../../services/project/projectService.js';

/**
 * Hook para eliminar un proyecto.
 *
 * @returns {object} - Un objeto con el estado de carga, error, éxito y función para eliminar un proyecto
 */
export function useProjectDelete() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [projectId, setProjectId] = useState(null);
    const mutate = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        setProjectId(id);
        try {
            await deleteProject(id);
            setSuccess(true);
            return true;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);
    return {
        loading,
        error,
        success,
        projectId,
        mutate,
    };
}
