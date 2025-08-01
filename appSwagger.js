const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EB Planty API Documentation",
      version: "1.0.0",
      description:
        "Welcome to the EB Planty API!\n\nThis interactive documentation provides a comprehensive overview of all endpoints for the EB Planty platform. Easily manage user accounts, authentication, plant operations, and more with clear request and response examples.\n\nExplore, test, and integrate with confidence.",
    },
    servers: [
      {
        url: "https://eb-project-backend-kappa.vercel.app",
        description: "Production server"
      },
      {
        url: "http://localhost:3003",
        description: "Development server"
      },
    ],
  },
  apis: [
    "./routes/PlantRoute.js",
    "./routes/UserRoute.js",
    "./routes/OrderRoutes.js"
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
// console.log(JSON.stringify(swaggerSpec, null, 2));
module.exports = swaggerSpec;
