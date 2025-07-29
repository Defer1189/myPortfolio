// myPortfolio/client/src/hooks/experience/useExperienceData.js
import { useState, useEffect, useCallback } from 'react';

import { getAllExperience } from '../../services/experience/experienceService.js';

/**
 * Hook para obtener datos de experiencia.
 *
 * @returns {{ data: Array|null, loading: boolean, error: string|null, fetchData: Function }} Un objeto que contiene los datos de experiencia, el estado de carga, el error y la función para obtener los datos.
 */
export const useExperienceData = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getAllExperience();
            setData(result);
        } catch (err) {
            setError(err.message);
            // eslint-disable-next-line no-console
            console.error('Error fetching experience:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, fetchData };
};
