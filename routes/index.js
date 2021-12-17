const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();

router.get('/', (req, res) => res.send('This is root!'));

router.post('/users', controllers.createUser);
router.post('/jokes', controllers.createJoke);

module.exports = router;
