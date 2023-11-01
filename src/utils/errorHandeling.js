const logger = require("../services/loggerService");

function handleServerError(res, error) {
  logger.error(error);
  res
    .status(500)
    .json({ error: "An error occurred while processing your request." });
}

function handleNotFound(res, msg) {
  res.status(400).json({ error: msg || "Not Found" });
}

module.exports = {
  handleServerError,
  handleNotFound,
};
