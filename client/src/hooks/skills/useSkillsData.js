// myPortfolio/client/src/hooks/skills/useSkillsData.js
import { useState, useEffect, useCallback } from 'react';

import { getAllSkills } from '../../services/skill/skillService.js';

/**
 * Hook para obtener datos de habilidades.
 *
 * @returns {{ data: Array|null, loading: boolean, error: string|null, fetchData: Function }} Un objeto con los datos de habilidades, estado de carga, error y función para recargar los datos.
 */
export const useSkillsData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getAllSkills();
            setData(result);
        } catch (err) {
            setError(err.message);
            // eslint-disable-next-line no-console
            console.error('Error fetching skills:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, fetchData };
};
