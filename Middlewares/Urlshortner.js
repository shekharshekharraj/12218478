const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "request_logs.txt");

const logger = (req, res, next) => {
  const logEntry = {
    method: req.method,
    url: req.originalUrl,
    timestamp: new Date().toISOString(),
    body: req.body,
  };

  try {
    fs.appendFileSync(logFilePath, JSON.stringify(logEntry) + "\n", "utf-8");
  } catch (error) {
    // Optionally log the error somewhere else or ignore to prevent request interruption
  }

  next();
};

module.exports = logger;
