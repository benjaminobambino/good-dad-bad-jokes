require('dotenv').config();
const jwt = require('jsonwebtoken');

const APP_SECRET = process.env.APP_SECRET;

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
  isLoggedIn
};
