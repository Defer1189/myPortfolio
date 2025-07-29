// myPortfolio/server/src/routes/homepage.routes.js
import { Router } from 'express';

import { getHomepageData, updateOrCreateUserProfile } from '../controllers/homepage.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Homepage
 *     description: Gestión de los datos de la página de inicio del portafolio
 *   - name: UserProfile
 *     description: Gestión del perfil del propietario del portafolio (para propósitos de administración/autenticación)
 */

// Ruta GET para obtener todos los datos de la Homepage (perfil, habilidades, proyectos destacados)
router.get('/', getHomepageData);

// Ruta POST para actualizar o crear el perfil del usuario (modelo User)
router.post('/', updateOrCreateUserProfile);

export default router;
