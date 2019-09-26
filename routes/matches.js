const express = require('express'),
  router = express.Router(),
  auth = require('../middleware/auth'),
  matches = require('../controllers/matches');

router.get('/', auth.isAuthorized, matches.getMatches); // Get A list of Matches
router.post('/', auth.isAuthorized, matches.addMatch);
router.post('/:matchId/games', auth.isAuthorized, matches.addGameToMatch);

module.exports = router;