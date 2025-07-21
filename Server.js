// const exp = require('express');
// const app = exp();
// const UserRoute = require('./routes/UserRoute');
// const PlantRoute = require('./routes/PlantRoute');
// const connectDB = require('./config/ConnectDb');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config({ quiet: true });
// const PORT = process.env.PORT;

// //Swagger UI doc running code
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./appSwagger'); // importing swaggerSpec from appSwagger.js

// // Serve Swagger UI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
//   explorer: true,
// }));

// // Serve Swagger spec as JSON
// app.get('/swagger.json', (req, res) => {
//   res.setHeader('Content-Type', 'application/json');
//   res.send(swaggerSpec);
// });
// // till here...

// app.use(cors());
// app.use(exp.json());
// connectDB();
// app.get('/',(req,res)=>{
//     res.send("hi there")
// })
// // app.use('/uploads', exp.static(path.join(__dirname, 'uploads')));
// app.use('/api/v0/user', UserRoute);
// app.use('/api/v0/plants', PlantRoute);

// app.listen(PORT, () => {
//     console.log('Server is running: http://localhost:' + PORT);
// });

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
  res.send(swaggerSpec);
});

// Connect MongoDB
connectDB();

// Health check
app.get('/', (req, res) => {
  res.send('Server is up & running');
});

// old multer middleware
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
