const express = require("express");
const router = express.Router();
const scraperService = require("../services/scrapperService");
const logger = require("../services/loggerService");
// error handeling
const {
  handleServerError,
  handleNotFound,
} = require("../utils/errorHandeling");

// GET /positions?department
router.get("/", async (req, res) => {
  logger.info("Get endpoint called");
  const department = req.query.department;

  if (!department) {
    logger.error("Department is required");

    return res.status(400).json({ error: "Department is required!" });
  }
  logger.info("getting positions for department: " + department);
  try {
    const jobTitles = await scraperService.getJobTitlesByDepartment(department);
    if (jobTitles.length === 0) {
      logger.error("Department Not Found");
      return handleNotFound(res, "Department Not Found!");
    }
    logger.info("open positions for department fetched successfully");
    res.status(200).json({ department, openings: jobTitles.length, jobTitles });
  } catch (error) {
    logger.error("Something is wrong error: ", error);

    handleServerError(res, error);
  }
});

module.exports = router;
