const express = require('express'),
  router = express.Router(),
  auth = require('../middleware/auth'),
  games = require('../controllers/games');

router.get('/', auth.isAuthorized, games.getGames); // Get A list of Games
router.post('/', auth.isAuthorized, games.addGame);

module.exports = router;