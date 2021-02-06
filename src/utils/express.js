const logger = require("./logger");

const formatResponse = (payload, error, res) => {
  res.json({
    status: res.statusCode,
    result: payload,
    errors: error
  });
};

const asyncHandler = (expressHandler) => (req, res, next) => {
  return Promise.resolve(
    expressHandler(req, res, next).catch((err) => {
      logger.error(err);
      next(err);
    })
  );
};

module.exports = {
  asyncHandler,
  formatResponse
};
