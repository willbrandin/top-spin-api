const express = require('express'),
  router = express.Router(),
  auth = require('../middleware/auth'),
  matches = require('../controllers/matches');

router.get('/', matches.getMatches);
router.put('/', matches.addMatches);

module.exports = router;