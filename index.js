const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Department list--------------------------------------------------------

// Sales
// Engineering
// Information Technology(IT)
// Marketing
// Service and Support

// pass department as param
app.get("/positions/:department", async (req, res) => {
  const department = req.params.department;

  if (!department) {
    return res.status(400).json({ error: "Department is required!" });
  }

  const url = "https://www.actian.com/company/careers";

  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // job-posting is the parent of parent div of department which has job-name div
    const departmentSection = $(
      `.department:contains('${department}')`
    ).closest(".job-posting");

    if (!departmentSection.length) {
      return res.status(404).json({ error: "No Department found" });
    }

    const jobTitles = departmentSection
      .find(".job-name")
      .map(function () {
        return $(this).text();
      })
      .get();

    res.status(200).json({ department, openings: jobTitles.length, jobTitles });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching data from Actian Careers.",
    });
  }
});

// Start the Express server.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
