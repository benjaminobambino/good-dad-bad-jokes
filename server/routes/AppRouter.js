const { Router } = require('express');
const controllers = require('../controllers/AppController');
const router = Router();

router.post('/jokes', controllers.createJoke);

router.get('/', (req, res) => res.send('This is root!'));
router.get('/jokes', controllers.getAllJokes);
router.get('/users', controllers.getAllUsers);
router.get('/users/:id', controllers.getUserById);
router.get('/jokes/flagged', controllers.getFlaggedJokes);

router.put('/users/:id', controllers.updateUser);
router.put('/jokes/:id', controllers.updateJoke);

router.delete('/users/:id', controllers.deleteUser);
router.delete('/jokes/:id', controllers.deleteJoke);

module.exports = router;
