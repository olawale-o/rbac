const router = require("express").Router();
const handler = require("./handler");
const userRoleHandler = require("./roles/handler");
const userPermissionHandler = require("./permissions/handler");
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
  "/:id/roles",
  checkRole("HR Executive"),
  checkPermission("can_update_users"),
  userRoleHandler.update,
);

router.put(
  "/:id/permissions",
  checkRole("HR Executive"),
  checkPermission("can_update_users"),
  userPermissionHandler.update,
);

module.exports = router;
