const mongoose = require("mongoose");
require("dotenv").config();
const { logger} = require("../utils/logger");
const dbLogger = logger({ label: "check-DB-connection" });
/**
 * Generates the MongoDB connection string from environment variables.
 *
 * @returns {string} - MongoDB connection string.
 * @throws {Error} - If DB_CONNECTION_URL is not defined in environment variables.
 */
const generateConnectionString = () => {
  let connectionUrl = process.env.DB_CONNECTION_URL;
  // Check if connectionUrl is defined
  if (!connectionUrl) {
    dbLogger.error("DB_CONNECTION_URL not defined in environment variables.")
    throw new Error("DB_CONNECTION_URL not defined in environment variables.");
  }

  return `${connectionUrl}`;
};

/**
 * Connects to the MongoDB database using Mongoose.
 * Logs the connection status or errors encountered during the connection attempt.
 *
 * @async
 * @throws {Error} - If the connection to the database fails.
 */
const connectDB = async () => {
  try {
    // Generate the connection URL using the helper function
    const url = generateConnectionString();

    await mongoose.connect(url, {
      dbName: process.env.DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    dbLogger.info(`Connected to database: ${process.env.DB_NAME}`);
  } catch (error) {
    console.error(`Failed to connect to database: ${error.message}`);
  }
};

module.exports = connectDB;
