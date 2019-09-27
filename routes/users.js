const express = require('express'),
  router = express.Router(),
  auth = require('../middleware/auth'),
  settingsRoutes = require('./matchSettings'),
  users = require('../controllers/users');

router.get('/:userId', auth.isAuthorized, users.getUser);
router.put('/:userId', auth.isAuthorized, users.updateUser);
router.post('/', users.signIn);

router.use('/:userId/match-settings', settingsRoutes)

module.exports = router;