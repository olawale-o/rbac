const router = require("express").Router();
const handler = require("./handler");
const userRoleHandler = require("./roles/handler");
const userPermissionHandler = require("./permissions/handler");
const { isAuthorized } = require("../../../middlewares/is-authorized");

router.get("/", async (req, res) => {
  return res.status(200).json({ message: "User resource" });
});

router.post("/", isAuthorized("can_create_users"), handler.new);

router.put(
  "/:id/roles",
  isAuthorized("can_update_users"),
  userRoleHandler.update,
);

router.put(
  "/:id/permissions",
  isAuthorized("can_update_users"),
  userPermissionHandler.update,
);

module.exports = router;
