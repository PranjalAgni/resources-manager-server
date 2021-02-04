const formatResponse = (payload, error, res) => {
  res.json({
    status: res.statusCode,
    result: payload,
    errors: error
  });
};

module.exports = {
  formatResponse
};
