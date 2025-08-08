// myPortfolio/server/src/utils/seedDatabase.js
import mongoose from 'mongoose';

import Experience from '../models/Experience.js';
import Homepage from '../models/Homepage.js';
import PageContent from '../models/PageContent.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import User from '../models/User.js';

import logger from './logger.js';

// Constantes para los textos largos de las páginas.
const CONTACT_INTRO_TEXT =
    '¡Estoy siempre abierto a nuevas oportunidades, colaboraciones o simplemente para charlar! Si tienes alguna pregunta, propuesta de proyecto o deseas conocer más sobre mi trabajo, no dudes en enviarme un mensaje.';
const ABOUT_ME_INTRO_TEXT =
    'Conoce más sobre mi trayectoria, pasiones y lo que me impulsa en el mundo del desarrollo web.';
const ABOUT_ME_HISTORY_TEXT =
    'Desde muy joven, la tecnología capturó mi interés. Empecé a experimentar con pequeños códigos y a construir cosas, lo que me llevó a mi pasión por el desarrollo web.';
const ABOUT_ME_PHILOSOPHY_TEXT =
    'Me enfoco en construir soluciones robustas y escalables, con una atención meticulosa al detalle y la experiencia de usuario. Siempre busco aprender y aplicar las últimas tecnologías.';

const PAGE_CONTENT_DEFAULTS = {
    contact: {
        title: 'Contáctame',
        introduction: CONTACT_INTRO_TEXT,
        sections: [],
    },
    about: {
        title: 'Acerca de Mí',
        introduction: ABOUT_ME_INTRO_TEXT,
        sections: [
            { sectionTitle: 'Mi Historia', text: ABOUT_ME_HISTORY_TEXT },
            { sectionTitle: 'Filosofía de Trabajo', text: ABOUT_ME_PHILOSOPHY_TEXT },
        ],
    },
};

/**
 * Elimina todos los documentos de las colecciones User, PageContent, Project, Skill, Experience y Homepage.
 */
async function cleanCollections() {
    logger.info('🗑️ Limpiando colecciones existentes...');
    await User.deleteMany({});
    await PageContent.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});
    await Homepage.deleteMany({});
    logger.info('✅ Colecciones limpiadas.');
}

/**
 * Población de la base de datos con un perfil de usuario por defecto.
 *
 * @param {Array<mongoose.Types.ObjectId>} skillIds - Lista de IDs de habilidades destacadas.
 * @returns {Promise<object>} El usuario creado.
 */
async function seedUser(skillIds) {
    const defaultUser = {
        name: 'Deiby Arango',
        email: 'admin@portfolio.com',
        password: 'admin123456',
        role: 'admin',
        title: 'Full-stack Developer',
        bio: 'Apasionado por la creación de soluciones web robustas y escalables, con experiencia en tecnologías modernas y un enfoque en el rendimiento y la experiencia de usuario.',
        profilePicture: '',
        featuredSkills: skillIds,
        socialLinks: [
            { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/deibyarango/' },
            { platform: 'GitHub', url: 'https://github.com/Defer1189' },
        ],
    };
    await User.create(defaultUser);
    logger.info('🌱 Usuario administrador creado con email: admin@portfolio.com');
    return User.findOne();
}

/**
 * Población de la base de datos con contenido por defecto para las páginas 'contacto' y 'acerca de mí'.
 */
async function seedPageContent() {
    for (const pageName in PAGE_CONTENT_DEFAULTS) {
        await PageContent.create({ pageName, ...PAGE_CONTENT_DEFAULTS[pageName] });
    }
    logger.info('🌱 Contenido de páginas poblado.');
}

/**
 * Población de la colección Homepage con un solo documento.
 *
 * @param {mongoose.Types.ObjectId} userId - El ID del usuario asociado a la homepage.
 * @param {mongoose.Types.ObjectId[]} skillIds - Lista de IDs de habilidades destacadas.
 * @param {mongoose.Types.ObjectId[]} featuredProjectIds - Lista de IDs de proyectos destacados.
 */
async function seedHomepage(userId, skillIds, featuredProjectIds) {
    logger.info('Iniciando población de datos para Homepage...');
    const homepageDoc = {
        user: userId,
        skills: skillIds,
        featuredProjects: featuredProjectIds,
    };

    await Homepage.create(homepageDoc);
    logger.info('✅ Datos de Homepage poblados exitosamente.');
}

/**
 * Proyecto E-commerce Plataform.
 *
 * @param {Array<mongoose.Types.ObjectId>} skillIds - Lista de IDs de habilidades utilizadas en el proyecto.
 * @returns {object} Proyecto de E-commerce por defecto.
 */
function getEcommerceProject(skillIds) {
    return {
        title: 'E-commerce Plataform',
        shortDescription: 'Plataforma de comercio electrónico con carrito de compras y pasarela de pago.',
        longDescription:
            'Desarrollé una plataforma completa de e-commerce utilizando React para el frontend, Node.js con Express para el backend y MongoDB como base de datos. Incluye autenticación de usuarios, gestión de productos, carrito de compras, y simulación de pasarela de pago. Se implementó un diseño responsivo y optimizaciones de rendimiento.',
        technologies: [skillIds[0], skillIds[1], skillIds[2], skillIds[3], skillIds[4]],
        imageUrl: 'https://placehold.co/600x400/FF0000/FFFFFF?text=E-commerce',
        liveDemoUrl: 'https://demo.ecommerce.com',
        githubUrl: 'https://github.com/yourusername/ecommerce-platform',
        order: 1,
        isFeatured: true,
    };
}

/**
 * Proyecto Sistema de Gestión de Tareas.
 *
 * @param {Array<mongoose.Types.ObjectId>} skillIds - Lista de IDs de habilidades utilizadas en el proyecto.
 * @returns {object} Proyecto de gestión de tareas por defecto.
 */
function getTaskManagerProject(skillIds) {
    return {
        title: 'Sistema de Gestión de Tareas',
        shortDescription: 'Aplicación web para organizar y gestionar tareas diarias.',
        longDescription:
            'Un sistema intuitivo de gestión de tareas que permite a los usuarios crear, actualizar, eliminar y categorizar tareas. Desarrollado con Vue.js para el frontend y una API RESTful con Python Flask y PostgreSQL. Incluye funcionalidades como recordatorios y filtros por prioridad.',
        technologies: [skillIds[1], skillIds[2], skillIds[5]],
        imageUrl: 'https://placehold.co/600x400/00FF00/000000?text=Task+Manager',
        liveDemoUrl: 'https://demo.taskmanager.com',
        githubUrl: 'https://github.com/yourusername/task-manager',
        order: 2,
        isFeatured: true,
    };
}

/**
 * Proyecto Blog Personal.
 *
 * @param {Array<mongoose.Types.ObjectId>} skillIds - Lista de IDs de habilidades utilizadas en el proyecto.
 * @returns {object} Proyecto de blog personal por defecto.
 */
function getBlogProject(skillIds) {
    return {
        title: 'Blog Personal',
        shortDescription: 'Blog personal para compartir artículos sobre desarrollo web.',
        longDescription:
            'Un blog personal simple donde publico artículos sobre tecnologías y experiencias de desarrollo. Desarrollado con Next.js y Markdown para los posts. Permite la búsqueda y categorización de artículos.',
        technologies: [skillIds[1]],
        imageUrl: 'https://placehold.co/600x400/0000FF/FFFFFF?text=Blog',
        liveDemoUrl: 'https://blog.yourusername.com',
        githubUrl: 'https://github.com/yourusername/personal-blog',
        order: 3,
        isFeatured: false,
    };
}

/**
 * Devuelve la lista de proyectos por defecto.
 *
 * @param {Array<mongoose.Types.ObjectId>} skillIds - Lista de IDs de habilidades utilizadas en los proyectos.
 * @returns {Array<object>} Lista de proyectos por defecto.
 */
function getDefaultProjects(skillIds) {
    return [getEcommerceProject(skillIds), getTaskManagerProject(skillIds), getBlogProject(skillIds)];
}

/**
 * Población de la base de datos con proyectos por defecto.
 *
 * @param {Array<mongoose.Types.ObjectId>} skillIds - Lista de IDs de habilidades utilizadas en los proyectos.
 * @returns {Promise<Array<mongoose.Types.ObjectId>>} Lista de IDs de proyectos destacados.
 */
async function seedProjects(skillIds) {
    const projects = getDefaultProjects(skillIds);
    const createdProjects = await Project.insertMany(projects);
    logger.info('🌱 Proyectos poblados.');

    return createdProjects.filter((project) => project.isFeatured).map((project) => project._id);
}

/**
 * Población de la base de datos con un conjunto de habilidades por defecto, incluyendo frontend, backend, bases de datos, herramientas y habilidades blandas.
 */
async function seedFrontendSkills() {
    const frontendSkills = [
        {
            name: 'JavaScript',
            category: 'Frontend',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
            level: 'Experto',
            order: 1,
        },
        {
            name: 'React',
            category: 'Frontend',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
            level: 'Avanzado',
            order: 2,
        },
        {
            name: 'Tailwind CSS',
            category: 'Frontend',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
            level: 'Avanzado',
            order: 9,
        },
    ];
    await Skill.insertMany(frontendSkills);
    logger.info('🌱 Habilidades Frontend pobladas.');
}

/**
 * Población de la base de datos con un conjunto de habilidades backend por defecto.
 */
async function seedBackendSkills() {
    const backendSkills = [
        {
            name: 'Node.js',
            category: 'Backend',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
            level: 'Avanzado',
            order: 3,
        },
        {
            name: 'Express.js',
            category: 'Backend',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
            level: 'Avanzado',
            order: 4,
        },
    ];
    await Skill.insertMany(backendSkills);
    logger.info('🌱 Habilidades Backend pobladas.');
}

/**
 * Población de la base de datos con un conjunto de habilidades de bases de datos por defecto.
 */
async function seedDatabaseSkills() {
    const databaseSkills = [
        {
            name: 'MongoDB',
            category: 'Databases',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
            level: 'Intermedio',
            order: 5,
        },
        {
            name: 'MySQL',
            category: 'Databases',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
            level: 'Intermedio',
            order: 6,
        },
        {
            name: 'PostgreSQL',
            category: 'Databases',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
            level: 'Intermedio',
            order: 7,
        },
    ];
    await Skill.insertMany(databaseSkills);
    logger.info('🌱 Habilidades de Bases de Datos pobladas.');
}

/**
 * Inserta habilidades de herramientas de control de versiones.
 */
async function seedVersionControlSkills() {
    const versionControlSkills = [
        {
            name: 'Git',
            category: 'Tools',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
            level: 'Experto',
            order: 8,
        },
    ];
    await Skill.insertMany(versionControlSkills);
}

/**
 * Inserta habilidades de herramientas de contenedores y CI/CD.
 */
async function seedContainerAndCICDSkills() {
    const containerAndCICDSkills = [
        {
            name: 'Docker',
            category: 'Tools',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
            level: 'Intermedio',
            order: 10,
        },
        {
            name: 'CI/CD',
            category: 'Tools',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/circleci/circleci-plain.svg',
            level: 'Intermedio',
            order: 11,
        },
    ];
    await Skill.insertMany(containerAndCICDSkills);
}

/**
 * Inserta habilidades de herramientas de desarrollo y testing.
 */
async function seedDevAndTestingSkills() {
    const devAndTestingSkills = [
        {
            name: 'Postman',
            category: 'Tools',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
            level: 'Intermedio',
            order: 12,
        },
        {
            name: 'Visual Studio Code',
            category: 'Tools',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
            level: 'Intermedio',
            order: 13,
        },
    ];
    await Skill.insertMany(devAndTestingSkills);
}

/**
 * Inserta habilidades de herramientas de calidad de código.
 */
async function seedCodeQualitySkills() {
    const codeQualitySkills = [
        {
            name: 'Eslint',
            category: 'Tools',
            iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg',
            level: 'Experto',
            order: 14,
        },
        {
            name: 'Prettier',
            category: 'Tools',
            iconUrl: 'https://unpkg.com/prettier-logo@1.0.3/images/prettier-icon-light.svg',
            level: 'Experto',
            order: 15,
        },
    ];
    await Skill.insertMany(codeQualitySkills);
}

/**
 * Población de la base de datos con un conjunto de habilidades relacionadas con herramientas por defecto.
 */
async function seedToolSkills() {
    await seedVersionControlSkills();
    await seedContainerAndCICDSkills();
    await seedDevAndTestingSkills();
    await seedCodeQualitySkills();
    logger.info('🌱 Habilidades de Herramientas pobladas.');
}

/**
 * Población de la base de datos con un conjunto de habilidades blandas por defecto.
 */
async function seedSoftSkills() {
    const softSkills = [
        { name: 'Comunicación', category: 'Soft Skills', level: 'Avanzado', order: 16 },
        { name: 'Resolución de Problemas', category: 'Soft Skills', level: 'Experto', order: 17 },
    ];
    await Skill.insertMany(softSkills);
    logger.info('🌱 Habilidades Blandas pobladas.');
}

/**
 * Población de la base de datos con todas las categorías de habilidades por defecto: frontend, backend, bases de datos, herramientas y habilidades blandas.
 *
 * @returns {Promise<Array<mongoose.Types.ObjectId>>} Lista de IDs de las habilidades destacadas.
 */
async function seedSkills() {
    await seedFrontendSkills();
    await seedBackendSkills();
    await seedDatabaseSkills();
    await seedToolSkills();
    await seedSoftSkills();
    logger.info('🌱 Todas las habilidades pobladas.');

    const skills = await Skill.find().sort({ order: 1 }).limit(6);
    return skills.map((skill) => skill._id);
}

/**
 * Población de la base de datos con experiencia laboral.
 */
async function seedJobExperiences() {
    const jobExperiences = [
        {
            type: 'job',
            title: 'Desarrollador Full Stack Senior',
            company: 'Tech Solutions Inc.',
            location: 'Bogotá, Colombia',
            startDate: new Date('2022-01-01'),
            endDate: null,
            description:
                'Lideré el desarrollo de aplicaciones web escalables, implementando microservicios y CI/CD. Mentoricé a desarrolladores junior y participé en la toma de decisiones arquitectónicas.',
            order: 1,
        },
        {
            type: 'job',
            title: 'Desarrollador Web Junior',
            company: 'Startup Innovate',
            location: 'Medellín, Colombia',
            startDate: new Date('2020-03-01'),
            endDate: new Date('2021-12-31'),
            description:
                'Desarrollo y mantenimiento de componentes frontend con React y APIs RESTful con Node.js. Colaboración en equipos ágiles.',
            order: 2,
        },
    ];
    await Experience.insertMany(jobExperiences);
    logger.info('🌱 Experiencia laboral poblada.');
}

/**
 * Población de la base de datos con experiencia educativa.
 */
async function seedEducationExperiences() {
    const educationExperiences = [
        {
            type: 'education',
            title: 'Ingeniería de Sistemas',
            institution: 'Universidad Nacional de Colombia',
            startDate: new Date('2016-08-01'),
            endDate: new Date('2021-12-31'),
            description:
                'Enfocado en desarrollo de software, bases de datos y algoritmos. Proyecto de grado sobre sistemas distribuidos.',
            order: 3,
        },
    ];
    await Experience.insertMany(educationExperiences);
    logger.info('🌱 Experiencia educativa poblada.');
}

/**
 * Población de la base de datos con experiencia de certificación.
 */
async function seedCertificationExperiences() {
    const certificationExperiences = [
        {
            type: 'certification',
            title: 'Certified MERN Stack Developer',
            institution: 'Udemy',
            startDate: new Date('2022-06-01'),
            endDate: null,
            description:
                'Certificación en desarrollo de aplicaciones full-stack con MongoDB, Express.js, React y Node.js.',
            order: 4,
        },
    ];
    await Experience.insertMany(certificationExperiences);
    logger.info('🌱 Experiencia de certificación poblada.');
}

/**
 * Población de la base de datos con un conjunto de experiencias por defecto, incluyendo trabajos, educación y certificaciones.
 */
async function seedExperiences() {
    await seedJobExperiences();
    await seedEducationExperiences();
    await seedCertificationExperiences();
    logger.info('🌱 Experiencia poblada.');
}

const seedDatabase = async () => {
    try {
        await cleanCollections();
        const skillIds = await seedSkills();
        const user = await seedUser(skillIds);
        const featuredProjectIds = await seedProjects(skillIds);
        await seedHomepage(user._id, skillIds.slice(0, 6), featuredProjectIds);
        await seedPageContent();
        await seedExperiences();
        logger.info('🎉 Base de datos poblada con éxito.');
    } catch (error) {
        logger.error(`❌ Error al poblar la base de datos: ${error.message}`);
        throw error;
    }
};

export default seedDatabase;
