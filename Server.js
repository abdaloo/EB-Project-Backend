const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ quiet: true });

// Routes
const UserRoute = require('./routes/UserRoute');
const PlantRoute = require('./routes/PlantRoute');

// DB connection
const connectDB = require('./config/ConnectDb');

// Swagger setup
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./appSwagger');

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger UI configuration for Vercel
const swaggerOptions = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "EB Planty API Documentation",
  swaggerOptions: {
    url: '/swagger.json',
  }
};

// Swagger JSON endpoint
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(swaggerSpec);
});

// Swagger UI routes - using serve and setup separately for better Vercel compatibility
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, swaggerOptions));

// Connect MongoDB
connectDB();

// Health check
app.get('/', (req, res) => {
  res.send('Server is up & running');
});

// Test endpoint to verify Swagger spec generation
app.get('/test-swagger', (req, res) => {
  try {
    res.json({
      message: 'Swagger spec generated successfully',
      hasSpec: !!swaggerSpec,
      specKeys: Object.keys(swaggerSpec || {}),
      pathsCount: swaggerSpec?.paths ? Object.keys(swaggerSpec.paths).length : 0
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error generating Swagger spec',
      error: error.message
    });
  }
});

// Main routes
app.use('/api/v0/user', UserRoute);
app.use('/api/v0/plants', PlantRoute);

// For Vercel: export app instead of listen()
module.exports = app;

// Local development only
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
  });
}
