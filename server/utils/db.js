const Sequelize = require("sequelize");

process.env.NODE_ENV === "production"
  ? require("dotenv").config({ path: ".env.production" })
  : require("dotenv").config({ path: ".env.development" });

// DB 연결
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  }
);

module.exports = sequelize;
