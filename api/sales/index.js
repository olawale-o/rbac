const router = require("express").Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({ message: "You can access sales resource" });
});

module.exports = router;
