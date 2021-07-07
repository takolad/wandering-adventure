const sequelize = require("../config/connection");
const { Game, Character, Event, NPC, EventLog } = require("../models");

const gameData = require("./gameSeedData.json");
const characterData = require("./characterSeedData.json");
const eventData = require("./eventSeedData.json");
const eventLogData = require("./eventLogSeedData.json");
const npcData = require("./npcSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const events = await Event.bulkCreate(eventData);
  const chars = await Character.bulkCreate(characterData);
  const games = await Game.bulkCreate(gameData);
  const eventLogs = await EventLog.bulkCreate(eventLogData);
  const npcs = await NPC.bulkCreate(npcData);

  console.log("\nDatabase successfully seeded!");
  process.exit(0);
};

seedDatabase();
