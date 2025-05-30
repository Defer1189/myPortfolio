// myPortfolio/server/src/config/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'myPortfolio API Documentation',
            version: '1.0.0',
            description: 'API RESTful para el portafolio personal de Deiby Arango.',
            contact: {
                name: 'Deiby Arango',
                email: 'arango.motoa@gmail.com',
                url: 'https://github.com/Defer1189/myPortfolio',
            },
        },
        servers: [],
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js', './src/models/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const getBaseUrl = () => {
    const port = process.env.PORT || (process.env.NODE_ENV === 'production' ? 8081 : 3000);
    return process.env.SWAGGER_SERVER || `http://localhost:${port}`;
};

const configureServer = (baseUrl) =>
    (swaggerSpec.servers = [
        {
            url: baseUrl,
            description: `${process.env.NODE_ENV === 'production' ? 'Producción' : 'Desarrollo'}`,
        },
    ]);

const createSwaggerUIHandler = (baseUrl) => [
    // eslint-disable-next-line no-console
    (req, _, next) => console.log(`📡 ${req.method} ${req.url}`) || next(),
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
        customSiteTitle: 'myPortfolio API',
        customCss: '.swagger-ui .topbar { display: none }',
        swaggerOptions: { url: `${baseUrl}/api-docs.json` },
    }),
];

const setupSwaggerEndpoint = (app, baseUrl) => {
    app.get('/api-docs.json', (_, res) => res.json(swaggerSpec));
    app.use('/api-docs', ...createSwaggerUIHandler(baseUrl));
};

const swaggerDocs = (app) => {
    const baseUrl = getBaseUrl();
    configureServer(baseUrl);
    setupSwaggerEndpoint(app, baseUrl);
};

export { swaggerSpec, swaggerDocs };
