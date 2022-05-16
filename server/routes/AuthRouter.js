const { Router } = require('express');
const controllers = require('../controllers/AuthController');
const router = Router();

router.post('/signup', controllers.signup);

module.exports = router;
