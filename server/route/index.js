const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const uploadRouter = require("./upload");
const formatRouter = require("./format");

router.get("/", (req, res, next) => {
  res.json({ message: "🖐 API Router" });
});

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/upload", uploadRouter);
router.use("/format", formatRouter);

module.exports = router;
