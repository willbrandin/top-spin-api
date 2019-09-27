var { User, Match, Game, Workout } = require('../models');

exports.getMatches = (request, response) => {
  const userId = request.user.id;

  Match.find({ user: userId })
  .populate('games')
  .then(matches => {
    return response.status(200).json(matches);
  })
  .catch(error => {
    return response.status(500).json(error);
  })
}

exports.addMatch = (request, response) => {
  const userId = request.user.id;
  
  User.findById(userId)
  .then(user => {    
    let match = matchWithUser(user, request.body);    
    return match.save()
  })
  .then(match => {    
    return response.status(201).json(match);
  })
  .catch(error => {
    return response.status(500).json(error);
  })
}

exports.addGameToMatch =  async (request, response) => {
  let matchId = request.params.matchId,
    userId = request.user.id;
  try {
    const user = await User.findById(userId);
    let match = await Match.findById(matchId);

    if (!match.isActive) {
      return response.status(400).json({message: 'Match is complete.'});
    }

    let game = gameWithUser(user, request.body);
    if (game.workout !== undefined) {
      await game.workout.save();
    }

    await game.save();
    match.games.push(game);
    await match.save();

    match = await Match.findById(matchId).populate('games');

    let playerMatchesWon = match.games.filter( game => game.playerDidWin );
    let opponentMatchesWon = match.games.filter( game => !game.playerDidWin );

    let playerDidWin = playerMatchesWon.length == match.neededToWin;
    let opponentDidWin = opponentMatchesWon.length == match.neededToWin;
    

    if (playerDidWin || opponentDidWin) {
      let result = `Player ${playerDidWin} -- Opponent ${opponentDidWin} Match Over`
      console.log(result);
      match.endDate = Date.now()
      match.playerDidWin = opponentDidWin ? false : playerDidWin
      match = await match.save();
    }

    return response.status(201).json(match);
  } catch (error) {
    console.log(error);        
    return response.status(500).json(error);
  }
}

const matchWithUser = (user, match) => {
  return new Match({
    startDate: match.date,
    user: user,
    numberOfGames: match.numberOfGames
  })
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