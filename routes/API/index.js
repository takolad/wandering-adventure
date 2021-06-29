const router = require("express").Router();
const userRoutes = require("./user");
const gameRoutes = require("./game");
const characterRoutes = require("./character");

router.use("/users", userRoutes);
router.use("/games", gameRoutes);
router.use("/character", characterRoutes);

module.exports = router;
