const express = require('express'),
  router = express.Router({ mergeParams: true }),
  auth = require('../middleware/auth'),
  settings = require('../controllers/matchSettings');

router.get('/', auth.isAuthorized, auth.isAuthenticated, settings.getSettings);
router.put('/:settingsId', auth.isAuthorized, auth.isAuthenticated, settings.updateSettings);

module.exports = router;