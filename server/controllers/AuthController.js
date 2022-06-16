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
        res.json({ user: payload, token });
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

const updatePassword = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (user) {
      const { oldPassword, newPassword } = req.body;
      const matchingPassword = await comparePassword(
        oldPassword,
        user.password
      );
      if (matchingPassword) {
        let password = await hashPassword(newPassword);
        await user.update({ password: password });
        return res.json({ status: 'Ok', payload: user });
      } else {
        res.status(400).send({ status: 'Error', msg: 'Invalid password' });
      }
    } else {
      res.status(400).send({ status: 'Error', msg: 'Invalid user ID' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (user) {
      const matchingPassword = await comparePassword(
        req.body.password,
        user.password
      );
      const { username } = req.body;
      if (matchingPassword) {
        const deleted = await User.findByIdAndDelete(id);
        if (deleted) {
          return res.json({ msg: `${username}'s account has been deleted.` });
        } else {
          res.status(400).send({
            status: 'Error',
            msg: `Oops! The user with an id of ${id} has not been deleted. Please try again.`
          });
        }
      } else {
        res.status(400).send({ status: 'Error', msg: 'Invalid password' });
      }
    } else {
      res.status(400).send({ status: 'Error', msg: 'Invalid user ID' });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  signup,
  login,
  checkSession,
  updatePassword,
  deleteUser
};
