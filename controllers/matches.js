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
      savePromises.push(match.workout.save());
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
  const workout = new Workout(match.workout);

  return new Match({
    startDate: match.startDate,
    user: user,
    score: match.score,
    workout: workout
  })
}