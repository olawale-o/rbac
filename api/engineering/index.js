const router = require("express").Router();
const handler = require("./handler");

router.get("/", handler.index);

router.use("/backend", require("./backend"));
router.use("/frontend", require("./frontend"));

module.exports = router;
