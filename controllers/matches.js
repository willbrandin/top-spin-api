var { User, Match, Workout } = require('../models');

exports.getMatches = (request, response) => {
  const userId = request.params.userId;

  Match.find({ user: userId })
  .populate('workout')
  .then(matches => {
    return response.status(200).json(matches);
  })
  .catch(error => {
    return response.status(500).json(error);
  })
}

exports.addMatches = (request, response) => {
  const userId = request.params.userId,
    matches = request.body;  
  
  var savePromises = []
  User.findById(userId)
  .then(user => {    
    let docMatches = matches.map(match => matchWithUser(user, match));     
    docMatches.forEach(match => {     
      console.log(match);
      
      if (match.workout !== undefined) {
        savePromises.push(match.workout.save());
      }
      savePromises.push(match.save());
    });    
    return Promise.all(savePromises);
  })
  .then(() => {
    return this.getMatches(request, response);
  })
  .catch(error => {
    return response.status(500).json(error);
  })
}

const matchWithUser = (user, match) => {
  let workout;
  if (match.workout !== undefined) {
    workout = new Workout({
      maxHeartRate: match.workout.maxHeartRate,
      user
    })
  }

  return new Match({
    date: match.date,
    user: user,
    score: match.score,
    workout: workout
  })
}