var mongoose = require('mongoose');
let Schema = mongoose.Schema;

let score = new Schema({
  playerScore: {
    type: Number,
    required: true
  },
  opponentScore: {
    type: Number, 
    required: true
  }
});

module.exports = mongoose.model('Score', score);
