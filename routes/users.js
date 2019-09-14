const express = require('express'),
  router = express.Router(),
  matchRoutes = require('./matches'),
  workoutRoutes = require('./workouts'),
  auth = require('../middleware/auth'),
  users = require('../controllers/users');

router.get('/:userId', auth.authorizeUser, users.getUser);
router.put('/:userId', auth.authorizeUser, users.updateUser);
router.post('/', users.signIn);

router.use('/:userId/matches', matchRoutes);
router.use('/:userId/workouts', workoutRoutes);

module.exports = router;