const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json({ message: "🖐 User Router" });
});

module.exports = router;
