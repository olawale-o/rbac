const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandler = require("../middlewares/error");
const { isAuthorized } = require("../middlewares/permission");
const { isAuthenticated } = require("../middlewares/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", require("../api/auth"));

app.use(isAuthenticated);
app.use("/api/v1/users", require("../api/users"));
app.use(
  "/api/v1/engineering",
  isAuthorized("can_view_engineering"),
  require("../api/engineering"),
);
app.use(
  "/api/v1/sales",
  isAuthorized("can_view_sales"),
  require("../api/sales"),
);
app.use("/api/v1/admin", require("../api/admin"));
app.use(errorHandler);

module.exports = app;
