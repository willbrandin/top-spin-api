const express = require('express'),
  router = express.Router({ mergeParams: true }),
  auth = require('../middleware/auth'),
  settings = require('../controllers/matchSettings');

router.get('/', auth.authorizeUser, settings.getSettings);
router.put('/:settingsId', auth.authorizeUser, settings.updateSettings);

module.exports = router;