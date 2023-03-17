const Sequelize = require("sequelize");
require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

let db = {};
// DB 연결
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
