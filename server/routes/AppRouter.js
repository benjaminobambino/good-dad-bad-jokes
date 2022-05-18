const { Router } = require('express');
const controllers = require('../controllers/AppController');
const middleware = require('../middleware');
const router = Router();

router.post('/jokes', middleware.isLoggedIn, controllers.createJoke);

router.get('/', (req, res) => res.send('This is root!'));
router.get('/jokes', controllers.getAllJokes);
router.get('/users', controllers.getAllUsers);
router.get('/users/:id', controllers.getUserById);
router.get('/jokes/flagged', controllers.getFlaggedJokes);

router.put('/users/:id', middleware.isLoggedIn, controllers.updateUser);
router.put('/jokes/:id', middleware.isLoggedIn, controllers.updateJoke);

router.delete('/users/:id', middleware.isLoggedIn, controllers.deleteUser);
router.delete('/jokes/:id', middleware.isLoggedIn, controllers.deleteJoke);

module.exports = router;
