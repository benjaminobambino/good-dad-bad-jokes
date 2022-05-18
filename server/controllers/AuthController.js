require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../middleware');

const APP_SECRET = process.env.APP_SECRET;

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
      console.log(req.body.password, user.password);
      if (matchingPassword) {
        const token = jwt.sign({ username: user.username }, APP_SECRET);
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

module.exports = {
  signup,
  login,
  checkSession
};
