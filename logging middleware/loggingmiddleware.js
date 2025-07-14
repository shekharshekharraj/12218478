const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../logs/request_logs.txt");

const logger = (req, res, next) => {
  const logData = {
    method: req.method,
    url: req.originalUrl,
    time: new Date().toISOString(),
    body: req.body,
  };

  try {
    fs.appendFileSync(logFilePath, JSON.stringify(logData) + "\n", "utf-8");
  } catch (err) {
    // Silent fail
  }

  next();
};

module.exports = logger;
