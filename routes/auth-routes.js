
const express = require('express');

const { forwardAuthenticated } = require('../helpers/auth');

const {
    registration,
    registrationPost,
    login,
    loginPost,
    logout,
    exist
  } = require('../controllers/auth-controller');

const router = express.Router();

router.get('/registration', registration);
router.post('/registration', registrationPost);
router.get('/login', login);
router.post('/login', loginPost);
router.get('/logout', logout);
router.get('/exist', exist);

module.exports = router;