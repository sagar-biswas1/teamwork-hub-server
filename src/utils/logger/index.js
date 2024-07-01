require("winston-daily-rotate-file");
require("dotenv").config();
const winston = require("winston");
const { colorize, json, timestamp, combine, printf, label } = winston.format;
const expressWinston = require("express-winston");
require("winston-mongodb");

//console transport
const myFormat = printf(({ level, message, label, timestamp }) => {
  const t = new Date(timestamp);
  return JSON.stringify({
    level,
    timestamp: `${t.toLocaleDateString()} at ${t.toLocaleTimeString()}`,
    context: label,
    message: {
      [level]: message,
    },
  });
});

const consoleTransport = new winston.transports.Console({
  level: "info",
  format: combine(label({ label: "console" }), timestamp(), json(), myFormat),
});

// file transport
const fileTransport = (level, filename) => {
  return new winston.transports.DailyRotateFile({
    level: level || "info",
    format: combine(timestamp(), json(), myFormat),
    filename: filename || "logs/info/info-%DATE%.log",

    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
  });
};

const infoFileTransport = fileTransport("info", "logs/info/info-%DATE%.log");
const errorFileTransport = fileTransport(
  "error",
  "logs/error/error-%DATE%.log"
);

// mongodb transport
const mongoDBTransport = new winston.transports.MongoDB({
  level: "error",
  db: process.env.DB_CONNECTION_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  capped: true,
  cappedMax: 4,
  cappedSize: 10000,
  expireAfterSeconds: 20,
  dbName: "allLogsCollection",
  collection: "logs",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    myFormat
  ),
});

function logger(dynamicLabel) {
  return winston.createLogger({
    level: "info",
    format: combine(label({ label: dynamicLabel?.label || "info" })),
    transports: [
      // consoleTransport,
      // infoFileTransport,
      errorFileTransport,
      // mongoDBTransport,
    ],
  });
}

const expressWinstonLogger = (level) =>
  expressWinston.logger({
    transports: [
      // consoleTransport,
      // infoFileTransport,
      errorFileTransport,
    ],
    level: level || "info",
    format: winston.format.combine(
      winston.format.json(),
      timestamp()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}", 
    expressFormat: true, 
    colorize: false,
  });

module.exports = {
  logger,
  infoLogger: expressWinstonLogger("info"),
  errorLogger: expressWinstonLogger("error"),
};
