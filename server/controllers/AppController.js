const { User, Joke } = require('../models');

// POST -->
const createJoke = async (req, res) => {
  try {
    const joke = await new Joke(req.body);
    await joke.save();
    return res.status(201).json({ joke });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// GET -->
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

const getFlaggedJokes = async (req, res) => {
  try {
    const jokes = await Joke.find({ flagged: true });
    return res.status(200).json({ jokes });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// PUT -->
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

const updateJoke = async (req, res) => {
  try {
    const { id } = req.params;
    await Joke.findByIdAndUpdate(id, req.body, { new: true }, (err, joke) => {
      if (err) {
        res.status(500).send(err);
      }
      if (!joke) {
        res.status(500).send('Joke not found.');
      }
      return res.status(200).json(joke);
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500);
  }
};

// DELETE -->
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send('The user has been deleted.');
    }
    throw new Error('User not found.');
  } catch (error) {
    console.log(error.message);
    return res.status(500);
  }
};

const deleteJoke = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Joke.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send('The joke has been deleted.');
    }
    throw new Error('Joke not found.');
  } catch (error) {
    console.log(error.message);
    return res.status(500);
  }
};

// TO DO:
// move deleteUser to AuthController and update logic to require password

module.exports = {
  createJoke,
  getAllJokes,
  getAllUsers,
  getUserById,
  getFlaggedJokes,
  updateUser,
  updateJoke,
  deleteUser,
  deleteJoke
};
