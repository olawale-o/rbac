const router = require("express").Router();
const handler = require("./handler");
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
  handler.revokeRole,
);

router.put(
  "/:id/assign_role",
  checkRole("HR Executive"),
  checkPermission("can_update_users"),
  handler.assignRole,
);

module.exports = router;
