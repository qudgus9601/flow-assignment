const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const userRouter = require("./user");
const uploadRouter = require("./upload");

router.get("/", (req, res, next) => {
  res.json({ message: "🖐 API Router" });
});

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/upload", uploadRouter);

module.exports = router;
