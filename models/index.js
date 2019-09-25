const User = require('./user'),
  Match = require('./match'),
  Workout = require('./workout')
  MatchSetting = require('./matchSetting')

const mongoose = require("mongoose");
mongoose.set('debug', true);
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, dbName: 'top-spin' });
mongoose.Promise = Promise;

module.exports = { User, Match, Workout, MatchSetting }