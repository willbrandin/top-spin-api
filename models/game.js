const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let game = new Schema({
  startDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  endDate: {
    type: Date,
    required: false
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
}, 
{
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }
});

game.virtual('playerDidWin').get(function() {
 return this.score.playerScore > this.score.opponentScore 
})

module.exports = mongoose.model('Game', game);
