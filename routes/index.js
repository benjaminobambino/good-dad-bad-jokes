const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();

router.post('/users', controllers.createUser);
router.post('/jokes', controllers.createJoke);

router.get('/', (req, res) => res.send('This is root!'));
router.get('/jokes', controllers.getAllJokes);
router.get('/users', controllers.getAllUsers);
router.get('/users/:id', controllers.getUserById);

router.put('/users/:id', controllers.updateUser);

module.exports = router;
