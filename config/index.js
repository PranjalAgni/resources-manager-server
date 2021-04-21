const dotenv = require("dotenv");
const appRoot = require("app-root-path");

const config = dotenv.config();

if (process.env.NODE_ENV !== "production" && config.error) {
  throw new Error("Could not find .env file");
}

module.exports = {
  isDev: process.env.NODE_ENV === "development",
  port: parseInt(process.env.PORT, 10),
  db: {
    host: process.env.DB_HOST,
    name: process.env.DB_SCHEMA,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  winston: {
    file: {
      level: "info",
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false
    },
    console: {
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true
    }
  }
};
