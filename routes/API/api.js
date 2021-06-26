const router = require('express').Router();
const character = require('../character');
const user = require('../user')

router.route('/')
  .get(character.findAll)
  .post(character.create);
router.route('/:id')
  .delete(character.delete);

router.route('/')
  .get(user.findAll)
  .post(user.create);
router.route('/:id')
  .delete(user.delete);

module.exports = router;