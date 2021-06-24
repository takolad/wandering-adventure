const router = require('express').Router();
const characterRoutes = require('./character');
const userRoutes = require('./user');

router.use('/character', characterRoutes);
router.use('/user', userRoutes);

module.exports = router;