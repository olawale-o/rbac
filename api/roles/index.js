const router = require("express").Router();
const handler = require("./handler");
const { checkRole } = require("../../middlewares/role");
const { checkPermission } = require("../../middlewares/permission");

router.post("/", async (req, res, next) => {});

module.exports = router;
