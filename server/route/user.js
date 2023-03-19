const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

// 기본 출력
router.get("/", (req, res, next) => {
  res.json({ message: "🖐 User Router" });
});

// 회웝가입
router.post("/signup", userController.signup);

// 로그인
router.post("/signin", userController.signin);

// 로그아웃
router.get("/signout", userController.signout);

// 토큰 검증
router.get("/verifytoken", userController.verifyCookie);

module.exports = router;
