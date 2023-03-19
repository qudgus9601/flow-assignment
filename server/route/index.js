const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const uploadRouter = require("./upload");
const formatRouter = require("./format");

router.get("/", (req, res, next) => {
  res.json({ message: "🖐 API Router" });
});

router.use("/user", userRouter);
router.use("/upload", uploadRouter);
router.use("/format", formatRouter);

module.exports = router;
