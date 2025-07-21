const swaggerJsdoc = require('swagger-jsdoc'); 
const path = require('path');

const swaggerOptions = { 
  definition: { 
    openapi: '3.0.0', 
    info: { 
      title: 'EB Planty User API Documentation', 
      version: '1.0.0', 
      description: 
        'Welcome to the EB Planty User API!\n\nThis interactive documentation provides a comprehensive overview of all userrelated endpoints for the EB Planty platform. Easily manage user accounts, authentication, and profile operations with clear request and response examples.\n\nExplore, test, and integrate with confidence.', 
    }, 
    servers: [  
      {
        url: 'https://eb-project-backend-kappa.vercel.app',
      }
    ], 
  }, 
  apis: ['./routes/*.js']
}; 
 
const swaggerSpec = swaggerJsdoc(swaggerOptions); 
module.exports = swaggerSpec;