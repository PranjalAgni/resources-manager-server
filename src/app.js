const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const { sequelize } = require("./models");
const routes = require("./api/index");
const config = require("../config");

const { notFound, errorHandler } = require("./middlewares/common");
const logger = require("./utils/logger");

const initalizeServer = async (app) => {
  // connect to DB
  await sequelize.authenticate();

  if (config.isDev) {
    await sequelize.sync({ force: true });
  }

  // If we are behind some reverse proxy like Nginx then we can trust this
  app.enable("trust proxy");

  app.use(compression());
  app.use(cors());
  app.use(helmet());
  app.use(morgan("combined", { stream: logger.stream }));
  app.use(express.json());

  app.get("/", (_req, res, _next) => {
    res.json({
      status: "OK"
    });
  });

  app.use("/api/", routes);
  app.use(notFound);
  app.use(errorHandler);
};

module.exports = { initalizeServer };
