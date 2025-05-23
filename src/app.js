const express = require("express");
const cookieParser = require("cookie-parser");

const { isAuthorized } = require("../middlewares/permission");
const { isAuthenticated } = require("../middlewares/auth");
const handleError = require("../libraries/error/src/handler");

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
app.use(handleError);

module.exports = app;
