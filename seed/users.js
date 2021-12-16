const db = require('../db');
const { Joke, User } = require('../models');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const main = async () => {
  const jokesContributed = await Joke.find();

  const users = [
    {
      name: 'Administrator',
      email: 'benjaminlpeck@gmail.com',
      username: 'admin',
      password: 'HelloWorld'
    }
  ];
};
