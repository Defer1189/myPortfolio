// myPortfolio/client/src/hooks/homepage/useHomepageData.js
import { useEffect, useState } from 'react';

import { getHomepageProfileData } from '../../services/homepage/homepageService.js';

/**
 * Formatea los datos del perfil de la página de inicio.
 *
 * @param {*} data - Datos del perfil recibidos desde el servicio.
 * @returns {object} Objeto formateado con usuario, habilidades y proyectos destacados.
 */
function formatProfileData(data) {
    return {
        user: data.user || {},
        skills: data.skills || [],
        featuredProjects: data.featuredProjects || [],
    };
}

/**
 * Hook personalizado para obtener y gestionar los datos del perfil de la página de inicio.
 *
 * @returns {object} Estado de la página de inicio.
 */
function useHomepageData() {
    const [state, setState] = useState({
        profile: null,
        loading: true,
        error: null,
    });
    useEffect(() => {
        const controller = new AbortController();
        getHomepageProfileData(controller.signal)
            .then((data) =>
                setState({
                    profile: formatProfileData(data),
                    loading: false,
                    error: null,
                }),
            )
            .catch(
                (error) =>
                    !controller.signal.aborted &&
                    setState({
                        profile: null,
                        loading: false,
                        error,
                    }),
            );
        return () => controller.abort();
    }, []);
    return state;
}

export default useHomepageData;
