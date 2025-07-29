// myPortfolio/server/src/models/Homepage.js
import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Homepage:
 *       type: object
 *       required:
 *         - user
 *         - skills
 *         - featuredProjects
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *           description: ID único del documento de la página de inicio.
 *         user:
 *           type: string
 *           format: ObjectId
 *           description: Referencia al usuario propietario del portafolio.
 *           example: "6624b5cdb081f982d8d8d8d8"
 *         skills:
 *           type: array
 *           description: Referencias a habilidades destacadas.
 *           items:
 *             type: string
 *             format: ObjectId
 *             example: "6624b5cdb081f982d8d8d8d9"
 *         featuredProjects:
 *           type: array
 *           description: Referencias a proyectos destacados.
 *           items:
 *             type: string
 *             format: ObjectId
 *             example: "6624b5cdb081f982d8d8d8da"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 */
const HomepageSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
        featuredProjects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    },
    { timestamps: true, versionKey: false },
);

const Homepage = model('Homepage', HomepageSchema);
export default Homepage;
