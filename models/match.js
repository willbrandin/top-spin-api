var mongoose = require('mongoose');
let Schema = mongoose.Schema;

let match = new Schema({
  startDate: {
    type: Date,
    required: 'Event needs start date'
  },
  score: {
    type: Schema.Types.ObjectId,
    ref: 'Score',
    required: true
  },
  workout: {
    type: Schema.Types.ObjectId,
    ref: 'Workout',
    required: false
  }
});

module.exports = mongoose.model('Match', match);
