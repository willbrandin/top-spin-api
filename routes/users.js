const express = require('express'),
  router = express.Router(),
  matchRoutes = require('./matches'),
  auth = require('../middleware/auth'),
  users = require('../controllers/users');

router.get('/:userId', auth.authorizeUser, users.getUser);
router.post('/', users.signIn);

router.use('/:userId/matches', matchRoutes)

module.exports = router;