const { sequelize, Sequelize } = require("../utils/db");
const Format = require("./format");

const Format_Count = sequelize.define(
  "format_count",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    format_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Format,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    count: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
    tableName: "format_count",
  }
);

Format.hasOne(Format_Count, { foreignKey: "format_id" });
Format_Count.belongsTo(Format, { foreignKey: "format_id" });

module.exports = Format_Count;
