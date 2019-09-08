const express = require('express'),
  router = express.Router({ mergeParams: true }),
  auth = require('../middleware/auth'),
  workouts = require('../controllers/workouts');

router.get('/', auth.authorizeUser, workouts.getWorkouts);

module.exports = router;