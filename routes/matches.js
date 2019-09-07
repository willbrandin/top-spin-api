const express = require('express'),
  router = express.Router({ mergeParams: true }),
  auth = require('../middleware/auth'),
  matches = require('../controllers/matches');

router.get('/', auth.isAuthorized, matches.getMatches);
router.put('/', auth.isAuthorized, matches.addMatches);

module.exports = router;