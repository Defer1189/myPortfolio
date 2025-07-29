// myPortfolio/client/src/hooks/homepage/useHomepageData.js
import { useEffect, useState } from 'react';

import { getHomepageProfileData } from '../../services/homepage/homepageService.js';

/**
 * Carga los datos del perfil de la Homepage.
 *
 * @param {AbortController} abortController - Controlador para abortar la petición.
 * @param {Function} setProfile - Función para actualizar el estado del perfil.
 * @param {Function} setError - Función para actualizar el estado de error.
 * @param {Function} setLoading - Función para actualizar el estado de carga.
 * @returns {Promise<void>}
 */
const fetchProfile = async (abortController, setProfile, setError, setLoading) => {
    let isAborted = false;
    try {
        const data = await getHomepageProfileData(abortController.signal);
        setProfile(data);
    } catch (err) {
        if (err.name === 'AbortError') {
            isAborted = true;
        } else {
            setError(err.message || 'Error al cargar la información del perfil.');
        }
    } finally {
        if (!isAborted) {
            setLoading(false);
        }
    }
};

const useHomepageData = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        fetchProfile(abortController, setProfile, setError, setLoading);

        return () => {
            abortController.abort();
        };
    }, []);

    return { profile, loading, error };
};

export default useHomepageData;
