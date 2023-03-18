const express = require("express");
const router = express.Router();
const formatController = require("../controller/format");

// 세팅 라우터의 기본 응답입니다.
router.get("/", (req, res, next) => {
  res.json({ message: "🖐 Setting Router" });
});

// 모든 포멧 리스트를 가져옵니다.
router.get("/list", formatController.list);

// 특정 포멧을 추가합니다.
router.post("/add", formatController.add);

// 특정 포멧을 제거합니다.
router.post("/remove", formatController.remove);

// 특정 포멧을 제한합니다.
router.post("/deprecate", formatController.deprecate);
module.exports = router;
