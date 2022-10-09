
const express = require('express');
// const session = require('express-session');
// const flash = require('connect-flash');
// const initializePassport = require('../helpers/passport-config');
// initializePassport(passport);

const {
    registration,
    registrationPost,
    login,
    loginPost,
    exist
  } = require('../controllers/auth-controller');

const router = express.Router();

router.get('/registration', registration);
router.post('/registration', registrationPost);
router.get('/login', login);
router.post('/login', loginPost);
router.get('/exist', exist);

module.exports = router;