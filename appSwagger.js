const express = require('express'); 
const swaggerUi = require('swagger-ui-express'); 
const swaggerJsdoc = require('swagger-jsdoc'); 
const userRoutes = require('./routes/userSwagger'); 
const path = require('path');
require('dotenv').config();
 
const app = express(); 
const PORT = process.env.PORT2;
 
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
        url: 'https://sample-three-khaki.vercel.app',
      }
    ], 
  }, 
  // apis: ['./routes/userSwagger.js'], // This must point to your route files 
  apis: [path.join(__dirname, './routes/userSwagger.js')]
}; 
 
const swaggerSpec = swaggerJsdoc(swaggerOptions); 
 
// Middleware 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 
app.use('/api', userRoutes); // Prefix all user routes with /api 

// Health Check
app.get('/health', (req, res) => res.send('App is healthy'));

// 404 route
app.use((req, res) => res.status(404).send('Route not found'));

app.listen(PORT, () => {
  console.log(`Swagger Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});