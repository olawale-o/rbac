const router = require("express").Router();
const handler = require("./handler");

router.get("/", async (req, res, next) => {});
router.get("/:id", async (req, res, next) => {});
router.post("/", async (req, res, next) => {});
router.put("/:id", async (req, res, next) => {});
router.delete("/:id", async (req, res, next) => {});

module.exports = router;
