require('dotenv').config();
const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const APP_SECRET = process.env.APP_SECRET;

const signup = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = await new User(req.body);
    await user.save();
    return res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  signup
};
