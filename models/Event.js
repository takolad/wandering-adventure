const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class NPC extends Model {}

Event.init(
  {
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    text: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: "event",
  }
);

module.exports = Event;
