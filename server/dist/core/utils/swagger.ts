const swaggerJsdoc = require('swagger-jsdoc');
export const swaggerUi = require('swagger-ui-express');

// Добавление сваггера
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rest API',
      version: '1.0.0',
      description: 'A simple API to handle user operations',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: [
    './infrastructure/routes/authRoutes.ts', 
    './infrastructure/routes/userRoutes.ts', 
    './infrastructure/routes/pageRoutes.ts', 
    './infrastructure/routes/websiteRoutes.ts',
    './infrastructure/routes/componentRoutes.ts',
    './infrastructure/routes/pageCardRoutes.ts',
    './infrastructure/routes/blockRoutes.ts',
    './server.ts'
  ],
};

export const swaggerSpec = swaggerJsdoc(options);