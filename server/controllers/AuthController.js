require('dotenv').config();
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const APP_SECRET = process.env.APP_SECRET;

const signup = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = await User.create(req.body);
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signup
};
