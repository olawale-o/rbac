const router = require("express").Router();
const handler = require("./handler");

router.post("/login", handler.login);

module.exports = router;
