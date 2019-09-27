const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let match = new Schema({
  startDate: {
    type: Date,
    default: Date.now()
  },
  endDate: {
    type: Date,
    default: null
  },
  numberOfGames: {
    type: Number,
    required: true
  },
  games: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Game',
    default: []
  }],
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  playerDidWin: {
    type: Boolean,
    default: null,
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

const isValidGameNumber = () => {
  return numberOfGames === 3 || numberOfGames === 5 || numberOfGames === 7
}

match.virtual('isActive').get(function() {
  return this.endDate === null && this.games.length !== this.numberOfGames
});

match.virtual('neededToWin').get(function() {  
  return this.numberOfGames === 3 
  ? 2
  : this.numberOfGames === 5
  ? 3
  : this.numberOfGames === 7
  ? 5
  : null
});

module.exports = mongoose.model('Match', match);
