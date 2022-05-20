const { Router } = require('express');
const controllers = require('../controllers/AuthController');
const middleware = require('../middleware');
const router = Router();

router.post('/signup', controllers.signup);
router.post('/login', controllers.login);
router.post(
  '/update-password/:userId',
  middleware.isLoggedIn,
  controllers.updatePassword
);
router.get('/session', middleware.isLoggedIn, controllers.checkSession);

module.exports = router;
