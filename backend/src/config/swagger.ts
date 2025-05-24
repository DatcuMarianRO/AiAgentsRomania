import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI Agents Romania API',
      version: '1.0.0',
      description: 'API documentation for AI Agents Romania marketplace',
      contact: {
        name: 'Invent Evolution SRL',
        email: 'contact@ai-agents-romania.com',
        url: 'https://ai-agents-romania.com',
      },
      license: {
        name: 'Proprietary',
        url: 'https://ai-agents-romania.com/terms',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001/api/v1',
        description: 'Development server',
      },
      {
        url: 'https://api.ai-agents-romania.com/v1',
        description: 'Production server',
      },
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and management endpoints',
      },
      {
        name: 'Agents',
        description: 'AI agent management endpoints',
      },
      {
        name: 'Conversations',
        description: 'Conversation management endpoints',
      },
      {
        name: 'Payments',
        description: 'Payment and subscription endpoints',
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
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/controllers/*.ts', './src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;