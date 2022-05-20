require('dotenv').config();
const { User } = require('../models');
const { hashPassword, comparePassword, createToken } = require('../middleware');

const signup = async (req, res) => {
  try {
    req.body.password = await hashPassword(req.body.password);
    const user = await User.create(req.body);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const matchingPassword = await comparePassword(
        req.body.password,
        user.password
      );
      if (matchingPassword) {
        const payload = { username: user.username, id: user.id };
        const token = createToken(payload);
        res.json({ token });
      } else {
        res.status(400).json({ error: "Password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const checkSession = (req, res) => {
  const { payload } = res.locals;
  res.send(payload);
};

// TO DO
// - updatePassword
const updatePassword = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const { oldPassword, newPassword } = req.body;
    if (user && (await comparePassword(oldPassword, user.password))) {
      let password = await hashPassword(newPassword);
      await user.update({ password });
      return res.json({ status: 'Ok', payload: user });
    }
    res.status(400).send({ status: 'Error', msg: 'Unauthorized' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// TO DO
// - deleteUser

module.exports = {
  signup,
  login,
  checkSession,
  updatePassword
};
