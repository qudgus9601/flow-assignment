const express = require("express");
const router = express.Router();
const formatController = require("../controller/format");

// 세팅 라우터의 기본 응답입니다.
router.get("/", (req, res, next) => {
  res.json({ message: "🖐 Setting Router" });
});

// 모든 포멧 리스트를 가져옵니다.
router.get("/list", formatController.list);

router.get("/test", (req, res) => {
  res.json({
    message: process.env.CLIENT_URL,
  });
});

// 특정 포멧을 추가합니다.
router.post("/add", formatController.add);

// 특정 포멧을 제거합니다.
router.post("/remove", formatController.remove);

// 특정 포멧을 제한합니다.
router.post("/deprecate", formatController.deprecate);

// 특정 포멧의 제한 횟수를 증가시킵니다.
router.post("/increment", formatController.incrementCount);
module.exports = router;
