// myPortfolio/server/src/models/Experience.js
import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     Experience:
 *       type: object
 *       required:
 *         - type
 *         - title
 *         - startDate
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *           description: ID único de la experiencia.
 *         type:
 *           type: string
 *           enum: [job, education, certification]
 *           description: |
 *             Tipo de experiencia:
 *             - job: Experiencia laboral (requiere company)
 *             - education: Educación formal (requiere institution)
 *             - certification: Certificación (requiere institution)
 *           example: "job"
 *         title:
 *           type: string
 *           description: Título del puesto/curso/certificación.
 *           example: "Desarrollador Full Stack Senior"
 *         company:
 *           type: string
 *           description: Empresa (requerido solo para tipo 'job').
 *           example: "Tech Solutions Inc."
 *         institution:
 *           type: string
 *           description: Institución (requerido para 'education'/'certification').
 *           example: "Universidad Nacional"
 *         location:
 *           type: string
 *           description: Ubicación física o remota.
 *           example: "Bogotá, Colombia"
 *         startDate:
 *           type: string
 *           format: date
 *           description: Fecha de inicio (YYYY-MM-DD).
 *           example: "2022-01-01"
 *         endDate:
 *           type: string
 *           format: date
 *           nullable: true
 *           description: |
 *             Fecha de fin (YYYY-MM-DD). Null = actualidad.
 *           example: "2024-12-31"
 *         description:
 *           type: string
 *           description: Responsabilidades/logros (máx. 1000 caracteres).
 *           example: "Lideré el desarrollo de aplicaciones web..."
 *         order:
 *           type: number
 *           description: Orden de visualización.
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Fecha de creación del registro.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           description: Fecha de última actualización.
 */
const ExperienceSchema = new Schema(
    {
        type: {
            type: String,
            required: [true, 'El tipo de experiencia es requerido'],
            enum: ['job', 'education', 'certification'],
        },
        title: {
            type: String,
            required: [true, 'El título es requerido'],
            trim: true,
            minlength: 3,
            maxlength: 200,
        },
        company: {
            type: String,
            trim: true,
            default: '',
        },
        institution: {
            type: String,
            trim: true,
            default: '',
        },
        location: {
            type: String,
            trim: true,
            default: '',
            maxlength: 100,
        },
        startDate: {
            type: Date,
            required: [true, 'La fecha de inicio es requerida'],
            validate: {
                validator: function (value) {
                    return value <= new Date();
                },
                message: 'La fecha de inicio no puede ser futura',
            },
        },
        endDate: {
            type: Date,
            default: null,
            validate: {
                validator: function (value) {
                    if (!value) {
                        return true;
                    }
                    return value >= this.startDate;
                },
                message: 'La fecha de fin debe ser posterior a la de inicio',
            },
        },
        description: {
            type: String,
            trim: true,
            default: '',
            maxlength: 1000,
        },
        order: {
            type: Number,
            default: 999,
            min: 0,
        },
    },
    { timestamps: true, versionKey: false },
);

ExperienceSchema.pre('validate', function (next) {
    if (this.type === 'job') {
        if (!this.company || this.company.trim() === '') {
            this.invalidate('company', 'El nombre de la empresa es requerido para experiencias laborales');
        }
    } else if (this.type === 'education' || this.type === 'certification') {
        if (!this.institution || this.institution.trim() === '') {
            this.invalidate('institution', 'El nombre de la institución es requerido');
        }
    }
    next();
});

const Experience = model('Experience', ExperienceSchema);
export default Experience;
