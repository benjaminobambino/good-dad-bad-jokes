const db = require('../db');
const { User, Joke } = require('../models');

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const main = async () => {
  const contributingUser = await User.findOne({ name: 'Benjamin' });

  const jokes = [
    {
      setup:
        'A cherry pie in Jamaica is $3.50. An apple pie in Belize is $4. A strawberry-rhubarb pie in the Costa Rica is $2.50.',
      punchline: 'These are the pie rates of the Caribbean.',
      likes: 0,
      author: contributingUser,
      viewed_by: [],
      flagged: false
    },
    {
      setup: 'I saw a magician driving down the street the other day.',
      punchline: 'All of a sudden, he turned into a driveway.',
      likes: 0,
      author: contributingUser,
      viewed_by: [],
      flagged: false
    },
    {
      setup: "What's one foot long and really slippery?",
      punchline: 'A slipper.',
      likes: 0,
      author: contributingUser,
      viewed_by: [],
      flagged: false
    },
    {
      setup: "What do you call something that's long, brown, and sticky?",
      punchline: 'A stick.',
      likes: 0,
      author: contributingUser,
      viewed_by: [],
      flagged: false
    },
    {
      setup: 'The invisible man broke up with his imaginary girlfriend.',
      punchline:
        "He said she wasn't being real with him. And if there's anything he hates, it's a lack of transparency.",
      likes: 0,
      author: contributingUser,
      viewed_by: [],
      flagged: false
    },
    {
      setup: 'What did the evil chicken lay?',
      punchline: 'Deviled eggs',
      likes: 0,
      author: contributingUser,
      viewed_by: [],
      flagged: false
    },
    {
      setup: "What's the sound of perfect pitch?",
      punchline: 'A banjo hitting the inside of a dumpster.',
      likes: 0,
      author: contributingUser,
      viewed_by: [],
      flagged: false
    },
    {
      setup: 'How many telemarketers does it take to change a light bulb?',
      punchline: 'Only one, but he has to do it while you are eating dinner.',
      likes: 0,
      author: contributingUser,
      viewed_by: [],
      flagged: false
    }
  ];

  await Joke.insertMany(jokes);
  console.log('Created jokes with users!');
};

const run = async () => {
  await main();
  db.close();
};

run();
