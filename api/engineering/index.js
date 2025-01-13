const router = require("express").Router();
const { checkPermission } = require("../../middlewares/permission");
const { checkRole } = require("../../middlewares/role");
const handler = require("./handler");

router.get("/", handler.index);

router.use("/backend", require("./backend"));
router.use("/frontend", require("./frontend"));

module.exports = router;
