const { Router } = require('express');
const controllers = require('../controllers/AuthController');
const router = Router();

router.post('/signup', controllers.signup);
router.post('/login', controllers.login);

module.exports = router;
