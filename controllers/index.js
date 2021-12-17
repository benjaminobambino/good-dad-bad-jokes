const { User, Joke } = require('../models');

// Get -->
const getAllJokes = async (req, res) => {
  try {
    const jokes = await Joke.find();
    return res.status(200).json({ jokes });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// Post -->
const createUser = async (req, res) => {
  try {
    const user = await new User(req.body);
    await user.save();
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createJoke = async (req, res) => {
  try {
    const joke = await new Joke(req.body);
    await joke.save();
    return res.status(201).json({ joke });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllJokes,
  getAllUsers,
  createUser,
  createJoke
};
