require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const OpenApiValidator = require("express-openapi-validator");
const { infoLogger } = require("../utils/logger");
const path = require("path");

/**
 * Applies middleware to the Express application.
 * 
 * @param {object} app - The Express application instance.
 */
const applyMiddleware = (app) => {
  // Use JSON middleware for parsing application/json
  app.use(express.json());

  // Enable Cross-Origin Resource Sharing
  app.use(cors());

  // Use custom info logger middleware
  // app.use(infoLogger);

  // Check if Swagger should be enabled
  const enableSwagger = process.env.ENABLE_SWAGGER === "true";

  if (enableSwagger) {
  

    // Resolve the path to the swagger.yaml file
    const swaggerPath = path.resolve(__dirname, "../..", "swagger.yaml");
   

    // Load the Swagger documentation
    const swaggerDoc = YAML.load(swaggerPath);

    // Setup Swagger UI
    app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

    // Setup OpenAPI Validator middleware
    app.use(
      OpenApiValidator.middleware({
        apiSpec: swaggerPath,
      })
    );
  }
};

module.exports = applyMiddleware;
