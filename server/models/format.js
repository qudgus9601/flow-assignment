const { sequelize, Sequelize } = require("../utils/db");

const Format = sequelize.define(
  "format",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    deprecated: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false,
    },
    static: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Format;
