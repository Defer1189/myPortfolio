// myPortfolio/server/src/models/Homepage.js
import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Homepage:
 *       type: object
 *       required: [user, skills]
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del documento
 *         user:
 *           type: string
 *           description: Referencia al usuario (ObjectId)
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *             format: ObjectId
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
const HomepageSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        skills: [{ type: Schema.Types.ObjectId, ref: 'Skill' }],
    },
    { timestamps: true, versionKey: false },
);

const Homepage = model('Homepage', HomepageSchema);
export default Homepage;
