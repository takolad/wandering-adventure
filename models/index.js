const User = require("./User");
const NPC = require("./NPC");
const Event = require("./Event");
const Character = require("./Character");

User.hasMany(Character, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Character.belongsTo(User, {
  foreignKey: "user_id",
});

Event.hasOne(NPC, {
  foreignKey: "event_id",
});

NPC.belongsTo(Event);

module.exports = { User, Character, Event, NPC };
