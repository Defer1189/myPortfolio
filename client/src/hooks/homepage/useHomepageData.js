// myPortfolio/client/src/hooks/homepage/useHomepageData.js
import { useEffect, useState } from 'react';

import { getUserProfile } from '../../services/homepage/homepageService.js';

/**
 * @description Custom hook para cargar los datos del perfil de la Homepage.
 * @returns {{
 * profile: object | null,
 * loading: boolean,
 * error: string | null
 * }}
 */

const useHomepageData = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile(abortController.signal);
                setProfile(data);
            } catch (err) {
                if (err.name === 'AbortError') {
                    // eslint-disable-next-line no-console
                    console.log('Fetch abortado');
                } else {
                    // eslint-disable-next-line no-console
                    console.error('Error fetching user profile in useHomepageData:', err);
                    setError(err.message || 'Error al cargar la información del perfil.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
        return () => {
            abortController.abort();
        };
    }, []);

    return { profile, loading, error };
};

export default useHomepageData;
