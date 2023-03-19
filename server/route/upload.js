const express = require("express");
const router = express.Router();
const uploadToS3 = require("../utils/upload-s3.js");
const uploadController = require("../controller/upload");

router.get("/", (req, res, next) => {
  res.json({ message: "🖐 Upload Router" });
});

router.post("/file", uploadToS3.single("file"), uploadController.upload);

module.exports = router;
