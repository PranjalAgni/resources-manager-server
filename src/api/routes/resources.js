const { Router } = require("express");
const { validationResult, body } = require("express-validator");
const resourcesService = require("../../services/resources");
const { StatusCodes } = require("http-status-codes");

const { formatResponse } = require("../../utils/response");
const logger = require("../../utils/logger");

const router = Router();

router.post(
  "/create",
  [
    body("url").exists().bail().isURL().bail(),
    body("description").exists().bail().notEmpty().isString().escape()
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      logger.info(req.body);
      if (!errors.isEmpty()) {
        logger.error(errors.array());
        res.status(StatusCodes.UNPROCESSABLE_ENTITY);
        return formatResponse(null, errors.array(), res);
      }

      await resourcesService.createResourceHandler(req.body);
      return formatResponse({ done: true }, null, res);
    } catch (ex) {
      logger.error(ex);
      return next(ex);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const latestResourcesList = await resourcesService.getAllResources();
    console.log(latestResourcesList);
    return formatResponse(latestResourcesList, null, res);
  } catch (ex) {
    return next(ex);
  }
});

module.exports = router;
