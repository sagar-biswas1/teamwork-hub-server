const express = require("express");
require("dotenv").config();
const { logger, errorLogger } = require("./utils/logger");
const applyMiddleware = require("./middleware");

// Initialize application logger
const appLogger = logger({ label: "app.js-file" });

// Initialize Express application
const routes = require("./routes");
const app = express();

// Apply middleware
applyMiddleware(app);

// Define routes
app.use(routes);

/**
 * A simple health check endpoint for the application.
 *
 * @param {Request} req - The request object representing the HTTP request.
 * @param {Response} res - The response object representing the HTTP response.
 *
 * @returns {void} This function does not return anything.
 *
 * @example
 * GET /api/health
 *
 * Response:
 * 200 OK
 * {
 *   "status": "Up"
 * }
 */
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "Up"
  });
});

// Error handling middleware
// app.use(errorLogger);
app.use((err, _req, res, _next) => {
  console.log(err);
  // appLogger.error(JSON.stringify(err));
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

module.exports = app;
