const { model } = require('mongoose');
const JokeSchema = require('./joke');
const UserSchema = require('./user');

const User = model('users', UserSchema);
const Joke = model('jokes', JokeSchema);

module.exports = {
  User,
  Joke
};
