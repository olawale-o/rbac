const router = require("express").Router();
const handler = require("./handler");
const roleHandler = require("../roles/handler");
const permissionHandler = require("../permissions/handler");
const { checkRole } = require("../../middlewares/role");
const { checkPermission } = require("../../middlewares/permission");

router.get("/", async (req, res, next) => {
  return res.status(200).json({ message: "User resource" });
});

router.post(
  "/",
  checkRole("HR Executive"),
  checkPermission("can_create_users"),
  handler.new,
);

router.put(
  "/:id/revoke_role",
  checkRole("HR Executive"),
  checkPermission("can_update_users"),
  roleHandler.revokeRole,
);

router.put(
  "/:id/assign_role",
  checkRole("HR Executive"),
  checkPermission("can_update_users"),
  roleHandler.assignRole,
);

router.put(
  "/:id/assign_permission",
  checkRole("HR Executive"),
  checkPermission("can_update_users"),
  permissionHandler.assignPermission,
);
router.put(
  "/:id/revoke_permission",
  checkRole("HR Executive"),
  checkPermission("can_update_users"),
  permissionHandler.revokePermission,
);

module.exports = router;
