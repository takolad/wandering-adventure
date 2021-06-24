const router = require('express').Router();
const characterRoutes = require('./character');
const userRoutes = require('./user');
const homeRoutes = require('./homepage')

router.use('/homepage', homeRoutes);
router.use('/character', characterRoutes);
router.use('/user', userRoutes);

module.exports = router;