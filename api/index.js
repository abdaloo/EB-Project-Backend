const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const PlantRoute = require('../routes/PlantRoute');
const UserRoute = require('../routes/UserRoute');
const swaggerUi = require('swagger-ui-express');
const userSwagger = require('../routes/userSwagger');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send("Hello world vercel");
})
// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(userSwagger));

// Routes
app.use('/plants', PlantRoute);
app.use('/users', UserRoute);

// Export as serverless handler for Vercel
module.exports.handler = serverless(app);
