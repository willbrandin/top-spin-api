const { MatchSetting } = require('../models');

exports.getSettings = (request, response) => {
  const userId = request.params.userId;

  MatchSetting.findOne({ user: userId })
  .then(settings => {
    return response.status(200).json(settings)
  })
  .catch(error => {
    return response.status(500).json(error);
  })
}

exports.updateSettings = (request, response) => {
  const updateQuery = {
    limit: request.body.limit,
    winByTwo: request.body.winByTwo,
    startWorkout: request.body.startWorkout
  }

  MatchSetting.findByIdAndUpdate(request.params.settingsId, updateQuery, {new: true})
  .then(settings => {    
    console.log(settings);
    
    response.status(200).json(settings);
  })
  .catch(error => {
    response.status(500).json(error);
  })
}