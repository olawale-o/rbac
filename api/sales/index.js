const router = require("express").Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({ message: "Sales resource" });
});

module.exports = router;
