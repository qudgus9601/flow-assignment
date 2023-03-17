const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

// 기본 출력
router.get("/", (req, res, next) => {
  res.json({ message: "🖐 User Router" });
});

// 회웝가입
router.post("/user/signup", userController.signup);

// 로그인
router.post("/user/signin", userController.signin);

// 로그아웃
router.get("/user/signout", userController.signout);

module.exports = router;
