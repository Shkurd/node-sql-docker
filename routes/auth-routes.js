
const express = require('express');

const { forwardAuthenticated } = require('../helpers/auth');

const {
    getRegistration,
    registrationPost,
    getLogin,
    loginPost,
    logout,
    getExist
  } = require('../controllers/auth-controller');

const router = express.Router();

router.get('/registration',forwardAuthenticated ,getRegistration);
router.post('/registration', registrationPost);
router.get('/login', forwardAuthenticated, getLogin);
router.post('/login', loginPost);
router.get('/logout', logout);
router.get('/exist', getExist);

module.exports = router;