const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let match = new Schema({
  startDate: {
    type: Date,
    required: 'Event needs start date'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  score: {
    playerScore: {
      type: Number,
      required: true
    },
    opponentScore: {
      type: Number,
      required: true
    }
  },
  workout: {
    type: Schema.Types.ObjectId,
    ref: 'Workout',
    required: false
  }
});

module.exports = mongoose.model('Match', match);
