const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "🖐 Setting Router" });
});

router.post("/delete");

module.exports = router;
