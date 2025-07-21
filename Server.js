const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
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

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  // res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.send(swaggerSpec);
});


// Connect MongoDB
connectDB();

// Health check
app.get('/', (req, res) => {
  res.send('Server is up & running');
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
