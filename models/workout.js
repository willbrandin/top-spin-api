var mongoose = require('mongoose');
let Schema = mongoose.Schema;

let workout = new Schema({
  maxHeartRate: {
    type: Number,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

module.exports = mongoose.model('Workout', workout);
