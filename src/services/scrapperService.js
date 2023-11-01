const axios = require("axios");
const cheerio = require("cheerio");

async function getJobTitlesByDepartment(department) {
  const url = process.env.ACTIAN_CAREERS_URL;
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  const departmentSection = $(`.department:contains('${department}')`).closest(
    ".job-posting"
  );

  if (!departmentSection.length) {
    return [];
  }

  const jobTitles = departmentSection
    .find(".job-name")
    .map(function () {
      return $(this).text();
    })
    .get();

  return jobTitles;
}

module.exports = {
  getJobTitlesByDepartment,
};
