const router = require("express").Router();
const handler = require("./handler");

router.get("/", async (req, res, next) => {
  return res.status(200).json({ message: "Admin resource" });
});

module.exports = router;
