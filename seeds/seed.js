const sequelize = require("../config/connection");
const { User, Character, Event, NPC } = require("../models");

const userData = require("./userSeedData.json");
const characterData = require("./characterSeedData.json");
const eventData = require("./eventSeedData.json");
const npcData = require("./npcSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const chars = await Character.bulkCreate(characterData);
  const events = await Event.bulkCreate(eventData);
  const npcs = await NPC.bulkCreate(npcData);

  console.log("\nDatabase successfully seeded!");
  process.exit(0);
};

seedDatabase();
