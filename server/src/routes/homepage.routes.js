// myPortfolio/server/src/routes/homepage.routes.js
import { Router } from 'express';

import { getUserProfile, updateOrCreateUserProfile } from '../controllers/homepage.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: UserProfile
 *     description: Gestión del perfil del propietario del portafolio
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     tags: [UserProfile]
 *     summary: Obtiene la información del perfil del propietario del portafolio
 *     description: Retorna los detalles del perfil, creando uno por defecto si no existe.
 *     responses:
 *       200:
 *         description: Perfil de usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 details:
 *                   type: string
 *   post:
 *     tags: [UserProfile]
 *     summary: Actualiza o crea la información del perfil del propietario del portafolio
 *     description: Permite actualizar los campos del perfil. Si no existe, lo crea.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Perfil de usuario actualizado/creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Perfil de usuario actualizado exitosamente."
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Error de validación de entrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error de validación"
 *                 details:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "El nombre es requerido"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 details:
 *                   type: string
 */
router.get('/', getUserProfile);
router.post('/', updateOrCreateUserProfile);

export default router;
