// myPortfolio/server/src/routes/contact.routes.js
import { Router } from 'express';

import { handleContactForm } from '../controllers/contact.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Contact
 *     description: Gestión de mensajes del formulario de contacto y contenido de la página.
 */

/**
 * @swagger
 * /api/contact:
 *   post:
 *     tags: [Contact]
 *     summary: Envía un mensaje a través del formulario de contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       201:
 *         description: Mensaje enviado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Mensaje enviado exitosamente. ¡Gracias por contactarme!"
 *                 data:
 *                   $ref: '#/components/schemas/Message'
 *       400:
 *         description: Error de validación
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
 *                   example: "Error interno del servidor"
 *                 details:
 *                   type: string
 *                   example: "Mensaje de error del servidor"
 */
router.post('/', handleContactForm);

export default router;
