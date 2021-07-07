const router = require("express").Router();
const gameRoutes = require("./game");
const eventRoutes = require("./event");
const eventLogRoutes = require("./eventlog");
const characterRoutes = require("./character");

router.use("/games", gameRoutes);
router.use("/events", eventRoutes);
router.use("/eventlogs", eventLogRoutes);
router.use("/characters", characterRoutes);

module.exports = router;
