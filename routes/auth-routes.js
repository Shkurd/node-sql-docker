const express = require('express');
const {
    registration,
    registrationPost,
    login,
    exist
  } = require('../controllers/auth-controller');

const router = express.Router();

router.get('/registration', registration);
router.post('/registration', registrationPost);
router.get('/login', login);
// router.post('/login', login);
router.get('/exist', exist);

module.exports = router;