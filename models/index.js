const NPC = require("./NPC");
const Game = require("./Game");
const Event = require("./Event");
const Character = require("./Character");
const EventLog = require("./EventLog");

Game.belongsToMany(Event, {
  through: {
    model: EventLog,
    unique: false,
  },
  onDelete: "CASCADE",
});

Event.belongsToMany(Game, {
  through: {
    model: EventLog,
    unique: false,
  },
  onDelete: "SET NULL",
});

Event.hasOne(NPC, {
  foreignKey: "event_id",
});

NPC.belongsTo(Event, {
  foreignKey: "event_id",
});

Character.hasOne(Game, {
  foreignKey: "character_id",
  onDelete: "CASCADE",
});

Game.belongsTo(Character, {
  foreignKey: "character_id",
  onDelete: "SET NULL",
});

module.exports = { Game, Character, Event, NPC, EventLog };
