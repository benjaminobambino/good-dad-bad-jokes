const db = require('../db');
const { Joke, User } = require('../models');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const main = async () => {
  const jokesContributed = await Joke.find();

  const users = [
    {
      name: 'Benjamin',
      email: 'benjaminlpeck@gmail.com',
      username: 'admin',
      password: 'HelloWorld1',
      jokes_contributed: jokesContributed,
      jokes_liked: [],
      jokes_viewed: [],
      jokes_flagged: []
    }
  ];

  await User.insertMany(users);
  console.log('Created users with jokes!');
};

const run = async () => {
  await main();
  db.close();
};

run();
