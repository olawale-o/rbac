const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("../middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/v1/auth", require("../api/auth"));
app.use("/api/v1/engineering", require("../api/engineering"));
app.use("/api/v1/sales", require("../api/sales"));
app.use("/api/v1/admin", require("../api/admin"));
app.use(errorHandler);

module.exports = app;
