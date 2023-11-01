require("dotenv").config(); // using env to make it production env (for multiple environments)
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const logger = require("./src/services/loggerService");

// single responsibility principle by dividing similar functionality routes into individual controllers
const positionsController = require("./src/controllers/positionsController");

// Middleware
app.use(express.json());

// Routes
app.use("/positions", positionsController);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
