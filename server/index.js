const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./route/index");
const { sequelize } = require("./utils/db");
const cookieParser = require("cookie-parser");

// 환경변수 설정
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

// db 연동
sequelize
  .sync({ force: true })
  .then(() => {})
  .catch(() => {});

// body, params 값 parsing
app.use(express.json());

// cookie-parser
app.use(cookieParser());

// cors 설정
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// 서버 디폴트 응답
app.get("/", (req, res, next) => {
  res.status(200).json({ message: "🖐 This is Flow Assignment's Api Server" });
});

// 라우팅
app.use("/api", router);

// 서버 오픈
const port = process.env.SERVER_URL;
app.listen(port, () => {});
