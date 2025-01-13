const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandler = require("../middlewares/error");
const { checkGroup } = require("../middlewares/group");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", require("../api/auth"));
app.use("/api/v1/users", require("../api/users"));
app.use(
  "/api/v1/engineering",
  checkGroup("Engineering"),
  require("../api/engineering"),
);
app.use("/api/v1/sales", checkGroup("Sales"), require("../api/sales"));
app.use("/api/v1/admin", checkGroup("Admin"), require("../api/admin"));
app.use(errorHandler);

module.exports = app;
