const { Router } = require("express");
const { validationResult, body } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const resourcesService = require("../../services/resources");

const { formatResponse, asyncHandler } = require("../../utils/express");
const logger = require("../../utils/logger");

const router = Router();

router.post(
  "/create",
  [
    body("url").exists().bail().isURL().bail(),
    body("description").exists().bail().notEmpty().isString().escape()
  ],
  asyncHandler(async (req, res, _next) => {
    const errors = validationResult(req);
    logger.info(req.body);
    if (!errors.isEmpty()) {
      logger.error(errors.array());
      res.status(StatusCodes.UNPROCESSABLE_ENTITY);
      return formatResponse(null, errors.array(), res);
    }

    await resourcesService.createResourceHandler(req.body);
    return formatResponse({ done: true }, null, res);
  })
);

router.get(
  "/",
  asyncHandler(async (_req, res, _next) => {
    const latestResourcesList = await resourcesService.getAllResources();
    console.log(latestResourcesList);
    return formatResponse(latestResourcesList, null, res);
  })
);

module.exports = router;

/**

 */
