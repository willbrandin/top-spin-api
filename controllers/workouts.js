var { Workout } = require('../models');

exports.getWorkouts = (request, response) => {
  const userId = request.params.userId;

  Workout.find({ user: userId })
  .then(workouts => {
    return response.status(200).json(workouts);
  })
  .catch(error => {
    return response.status(500).json(error);
  })
}