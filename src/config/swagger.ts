import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Workcity Assessment API',
      version: '1.0.0',
      description: 'API for managing users, clients, and projects.',
    },
    servers: [
      {
        url: process.env.BASE_URI || 'http://localhost:8080',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    // security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.ts'], // <- where your route JSDocs live
};

export const swaggerSpec = swaggerJsdoc(options);
