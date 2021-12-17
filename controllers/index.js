const { User, Joke } = require('../models');

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

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).send('User with specified ID does not exist.');
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// Put
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, req.body, { new: true }, (err, user) => {
      if (err) {
        res.status(500).send(err);
      }
      if (!user) {
        res.status(500).send('User not found.');
      }
      return res.status(200).json(user);
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500);
  }
};

module.exports = {
  createUser,
  createJoke,
  getAllJokes,
  getAllUsers,
  getUserById,
  updateUser
};
