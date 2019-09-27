const express = require('express'),
  router = express.Router({ mergeParams: true }),
  auth = require('../middleware/auth'),
  workouts = require('../controllers/workouts');

router.get('/', auth.isAuthorized, auth.isAuthenticated, workouts.getWorkouts);

module.exports = router;