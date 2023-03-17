const { sequelize, Sequelize } = require("../utils/db");
const Format = require("./format");

const Format_Count = sequelize.define(
  "format_count",
  {
    format_name: {
      type: Sequelize.STRING,
      primaryKey: true,
      references: {
        model: Format,
        key: "name",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    count: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Format_Count;
