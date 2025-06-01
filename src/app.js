const express = require("express");
const cookieParser = require("cookie-parser");

const { isAuthorized } = require("../middlewares/permission");
const { isAuthenticated } = require("../middlewares/auth");
const {
  ExceptionHandler,
} = require("../libraries/exception/exception.handler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", require("../apps/auth/entry-point/api"));

app.use(isAuthenticated);
app.use("/api/v1/users", require("../apps/users/entry-point/api"));
app.use(
  "/api/v1/engineering",
  isAuthorized("can_view_engineering"),
  require("../apps/engineering/entry-point/api"),
);
app.use(
  "/api/v1/sales",
  isAuthorized("can_view_sales"),
  require("../apps/sales/entry-point/api"),
);
app.use("/api/v1/admin", require("../apps/admin/entry-point/api"));
app.use(ExceptionHandler);

module.exports = app;
