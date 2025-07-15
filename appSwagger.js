const express = require('express'); 
const swaggerUi = require('swagger-ui-express'); 
const swaggerJsdoc = require('swagger-jsdoc'); 
const userRoutes = require('./routes/userSwagger'); 
 
const app = express(); 
const PORT = 3004; 
 
// Swagger configuration 
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
        url: 'http://localhost:3003', 
      }, 
      { 
        url: 'https://eb-project-backend-production.up.railway.app', 
      }, 
      {
        url: 'http://eb-project-backend-ynuj.vercel.app',
      },
    ], 
  }, 
  apis: ['./routes/userSwagger.js'], // This must point to your route files 
}; 
 
const swaggerSpec = swaggerJsdoc(swaggerOptions); 
 
// Middleware 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 
app.use('/api', userRoutes); // Prefix all user routes with /api 
 
app.listen(PORT, () => { 
  console.log(`Server running on http://localhost:${PORT}`); 
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`); 
}); 