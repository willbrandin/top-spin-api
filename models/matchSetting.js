const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let matchSetting = new Schema({
  limit: {
    type: Number,
    required: true,
    default: 11
  },
  winByTwo: {
    type: Boolean,
    required: true,
    default: true
  },
  startWorkout: {
    type: Boolean,
    required: true,
    default: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const isValidLimit = () => {
  return limit === 21 || limit === 11 || limit === 7
}

module.exports = mongoose.model('MatchSetting', matchSetting);