// myPortfolio/server/src/routes/pageContent.routes.js
import { Router } from 'express';

import { getPageContent, updatePageContent } from '../controllers/pageContent.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Page Content
 *     description: Gestión de contenido estático y dinámico para las páginas del portafolio (ej. Acerca de, Contacto).
 */

/**
 * @swagger
 * /api/content/{pageName}:
 *   get:
 *     tags: [Page Content]
 *     summary: Obtiene el contenido de una página específica.
 *     description: Retorna el título, introducción y secciones de una página por su nombre único.
 *       Si el contenido de la página no existe, se crea uno por defecto.
 *     parameters:
 *       - in: path
 *         name: pageName
 *         required: true
 *         schema:
 *           type: string
 *         description: El nombre único de la página (ej., 'contact', 'about'). Debe coincidir con el `pageName` del documento PageContent.
 *         examples:
 *           contact_page:
 *             summary: Contenido de la página de contacto
 *             value: contact
 *           about_page:
 *             summary: Contenido de la página "Acerca de mí"
 *             value: about
 *     responses:
 *       200:
 *         description: Contenido de la página obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PageContent'
 *       500:
 *         description: Error interno del servidor al obtener el contenido de la página.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor al obtener el contenido de la página."
 */
router.get('/:pageName', getPageContent);

/**
 * @swagger
 * /api/content/{pageName}:
 *   post:
 *     tags: [Page Content]
 *     summary: Crea o actualiza el contenido de una página específica.
 *     description: Permite actualizar el título, introducción y secciones de una página por su nombre único.
 *       Si el contenido de la página no existe, se crea.
 *       Esta funcionalidad es ideal para un futuro panel de administración o uso interno.
 *     parameters:
 *       - in: path
 *         name: pageName
 *         required: true
 *         schema:
 *           type: string
 *         description: El nombre único de la página a actualizar (ej., 'contact', 'about').
 *         examples:
 *           contact_page_update:
 *             summary: Actualizar contenido de Contacto
 *             value: contact
 *           about_page_update:
 *             summary: Actualizar contenido de "Acerca de mí"
 *             value: about
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PageContent'
 *           examples:
 *             contactUpdatePayload:
 *               summary: Ejemplo de payload para actualizar Contacto
 *               value:
 *                 title: "¡Contáctame Ahora!"
 *                 introduction: "Mi equipo y yo estamos listos para escucharte. Envíanos tu mensaje a través de este formulario."
 *                 sections: []
 *             aboutUpdatePayload:
 *               summary: Ejemplo de payload para actualizar 'Acerca de mí'
 *               value:
 *                 title: "Sobre Deiby Arango - Desarrollador Full-Stack"
 *                 introduction: "Mi viaje en el desarrollo web comenzó con una curiosidad insaciable por cómo funcionan las cosas en internet..."
 *                 sections:
 *                   - sectionTitle: "Mi Filosofía de Desarrollo"
 *                     text: "Me apasiona construir aplicaciones que no solo sean funcionales, sino también escalables, mantenibles y que ofrezcan una excelente experiencia de usuario."
 *                     image: "https://example.com/philosophy-img.jpg"
 *                   - sectionTitle: "Tecnologías y Habilidades Clave"
 *                     text: "Profundo conocimiento en JavaScript, Node.js, Express, React, y bases de datos NoSQL como MongoDB, junto con experiencia en PostgreSQL para proyectos relacionales."
 *                     image: "https://example.com/skills-img.jpg"
 *     responses:
 *       200:
 *         description: Contenido de la página actualizado/creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contenido de la página actualizado exitosamente."
 *                 data:
 *                   $ref: '#/components/schemas/PageContent'
 *       400:
 *         description: Error de validación de entrada o datos inválidos.
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
 *                   example: "El campo 'title' es requerido."
 *       500:
 *         description: Error interno del servidor al actualizar el contenido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor al actualizar el contenido de la página."
 */
router.post('/:pageName', updatePageContent);

export default router;
