const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandler = require("../middlewares/error");
const { checkPermission } = require("../middlewares/permission");
const { checkAuth } = require("../middlewares/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", require("../api/auth"));

app.use(checkAuth);
app.use("/api/v1/users", require("../api/users"));
app.use(
  "/api/v1/engineering",
  checkPermission("can_view_engineering"),
  require("../api/engineering"),
);
app.use(
  "/api/v1/sales",
  checkPermission("can_view_sales"),
  require("../api/sales"),
);
app.use("/api/v1/admin", require("../api/admin"));
app.use(errorHandler);

module.exports = app;
