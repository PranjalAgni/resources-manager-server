const util = require("util");
const { Router } = require("express");
const resources = require("./routes/resources");
const logger = require("../utils/logger");

const router = Router();

const inspectBody = (req, res, next) => {
  logger.info(`RQ Body = , ${util.inspect(req.body)}`);
  next();
};

// Common Middlewares
router.use(inspectBody);

// Initalize routes
router.use("/resources", resources);

module.exports = router;
