const router = require("express").Router();
const { isAuthorized } = require("../../../middlewares/permission");
const { checkRole } = require("../../../middlewares/role");

router.post(
  "/",
  checkRole("Back-End Engineer"),
  isAuthorized("can_create_backend"),
  async (req, res, next) => {
    res.status(200).json({ message: "You can create backend resource" });
  },
);
router.put(
  "/",
  checkRole("Back-End Engineer"),
  isAuthorized("can_update_backend"),
  async (req, res, next) => {
    res.status(200).json({ message: "You can update backend resource" });
  },
);
router.delete(
  "/",
  checkRole("Back-End Engineer"),
  isAuthorized("can_delete_backend"),
  async (req, res, next) => {
    res.status(200).json({ message: "You can delete backend resource" });
  },
);

module.exports = router;
