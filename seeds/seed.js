const sequelize = require("../config/connection");
const { Game, Character, Event, NPC } = require("../models");

const gameData = require("./gameSeedData.json");
const characterData = require("./characterSeedData.json");
const eventData = require("./eventSeedData.json");
const npcData = require("./npcSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const chars = await Character.bulkCreate(characterData);
  const games = await Game.bulkCreate(gameData);
  const events = await Event.bulkCreate(eventData);
  const npcs = await NPC.bulkCreate(npcData);

  console.log("\nDatabase successfully seeded!");
  process.exit(0);
};

seedDatabase();
