// myPortfolio/client/src/hooks/projects/useProjectsAdmin.js
import { useProjectCreate } from './useProjectCreate.js';
import { useProjectDelete } from './useProjectDelete.js';
import { useProjectsList } from './useProjectsList.js';
import { useProjectUpdate } from './useProjectUpdate.js';

/**
 * Hook para la administración de proyectos.
 *
 * @returns {object} - Un objeto que contiene la lista de proyectos, estado de carga, error y funciones para crear, actualizar y eliminar proyectos
 */
export function useProjectsAdmin() {
    const { data: projects, loading, error, refetch } = useProjectsList();
    const create = useProjectCreate();
    const update = useProjectUpdate();
    const remove = useProjectDelete();
    return {
        projects,
        loading,
        error,
        refetch,
        createProject: create,
        updateProject: update,
        deleteProject: remove,
    };
}
