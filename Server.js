const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ quiet: true });

// Routes
const UserRoute = require('./routes/UserRoute');
const PlantRoute = require('./routes/PlantRoute');
const OrderRoute = require('./routes/OrderRoutes');
// DB connection
const connectDB = require('./config/ConnectDb');

// Swagger setup
const swaggerSpec = require('./appSwagger');

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger JSON endpoint
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(swaggerSpec);
});

// Custom Swagger UI HTML template
const swaggerHtml = require('./swaggerCustomUI');

// Swagger UI route with custom HTML
app.get('/api-docs', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(swaggerHtml);
});

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
app.use('/api/v0/orders', OrderRoute);

// For Vercel: export app instead of listen()
module.exports = app;

// Local development only
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
  });
}
