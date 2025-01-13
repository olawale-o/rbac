const router = require("express").Router();
const { checkPermission } = require("../../../middlewares/permission");
const { checkRole } = require("../../../middlewares/role");

router.post(
  "/",
  checkRole("Front-End Engineer"),
  checkPermission("can_create_frontend"),
  async (req, res, next) => {
    res.status(200).json({ message: "You can create frontend resource" });
  },
);
router.put(
  "/",
  checkRole("Front-End Engineer"),
  checkPermission("can_update_frontend"),
  async (req, res, next) => {
    res.status(200).json({ message: "You can update frontend resource" });
  },
);
router.delete(
  "/",
  checkRole("Front-End Engineer"),
  checkPermission("can_delete_frontend"),
  async (req, res, next) => {
    res.status(200).json({ message: "You can delete frontend resource" });
  },
);

module.exports = router;
