var { User, Game, Workout } = require('../models');

exports.getGames = (request, response) => {
  const userId = request.user.id;

  Game.find({ user: userId })
  .populate('workout')
  .then(games => {
    return response.status(200).json(games);
  })
  .catch(error => {
    return response.status(500).json(error);
  })
}

exports.addGame = async (request, response) => {
  const userId = request.user.id
  
  try {
    const user = await User.findById(userId)
    let game = gameWithUser(user, request.body);

    if (game.workout !== undefined) {
      await game.workout.save();
    }

    game = await game.save();
    return response.status(201).json(game) 
  } catch (error) {
    console.log(error);        
    return response.status(500).json(error);
  }
}

const gameWithUser = (user, game) => {
  let workout;
  if (game.workout !== undefined) {
    workout = new Workout({
      maxHeartRate: game.workout.maxHeartRate,
      user
    })
  }

  return new Game({
    startDate: game.startDate,
    endDate: game.endDate,
    user: user,
    score: game.score,
    workout: workout
  })
}