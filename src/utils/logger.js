const winston = require("winston");
const config = require("../../config");

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(config.winston.console),
    new winston.transports.File(config.winston.file)
  ],
  exitOnError: false // do not exit on handled exceptions
});

logger.stream = {
  write: (message) => {
    logger.info(message);
  }
};

module.exports = logger;
