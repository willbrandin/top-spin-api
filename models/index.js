const User = require('./user'),
  Game = require('./game'),
  Workout = require('./workout'),
  Match = require('./match'),
  MatchSetting = require('./matchSetting');

const mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, dbName: 'top-spin' });
mongoose.Promise = Promise;

module.exports = { User, Game, Match, Workout, MatchSetting }
