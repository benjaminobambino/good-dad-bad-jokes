require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const APP_SECRET = process.env.APP_SECRET;

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword;
};

const comparePassword = async (password, storedPassword) => {
  let passwordMatch = await bcrypt.compare(password, storedPassword);
  return passwordMatch;
};

const isLoggedIn = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      if (token) {
        const payload = jwt.verify(token, APP_SECRET);
        if (payload) {
          req.user = payload;
          next();
        } else {
          res.status(400).json({ error: 'Token verification failed' });
        }
      } else {
        res.status(400).json({ error: 'Malformed auth header' });
      }
    } else {
      res.status(400).json({ error: 'No authorization header' });
    }
  } catch (error) {
    res.status(400).send({ status: 'Error', msg: 'Unauthorized' });
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  isLoggedIn
};
