const express = require('express'),
  router = express.Router({ mergeParams: true }),
  auth = require('../middleware/auth'),
  matches = require('../controllers/matches');

router.get('/', auth.authorizeUser, matches.getMatches);
router.put('/', auth.authorizeUser, matches.addMatches);

module.exports = router;