const router = require("express").Router();
const { checkPermission } = require("../../middlewares/permission");
const { checkRole } = require("../../middlewares/role");
const handler = require("./handler");

router.get("/", handler.index);
router.get(
  "/backend",
  checkRole("Back-End Engineer"),
  checkPermission("can_view_backend"),
  handler.index,
);
router.post(
  "/backend",
  checkRole("Back-End Engineer"),
  checkPermission("can_create_backend"),
  handler.index,
);
router.put(
  "/backend",
  checkRole("Back-End Engineer"),
  checkPermission("can_update_backend"),
  handler.index,
);
router.delete(
  "/backend",
  checkRole("Back-End Engineer"),
  checkPermission("can_delete_backend"),
  handler.index,
);
router.get(
  "/frontend",
  checkRole("Front-End Engineer"),
  checkPermission("can_view_frontend"),
  handler.index,
);

module.exports = router;
