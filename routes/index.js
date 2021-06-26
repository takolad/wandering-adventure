const router = require('express').Router();
const characterRoutes = require('./character');
const userRoutes = require('./user');
const homeRoutes = require('./homepage')

router.use('/homepage', homeRoutes);
router.use('/character', characterRoutes);
router.use('/user', userRoutes);

// If no API routes are hit, send the React app
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

module.exports = router;