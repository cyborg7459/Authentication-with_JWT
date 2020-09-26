const express = require('express');
const router = express.Router();
const authConroller = require('../controllers/authController');

router.get('/signup', authConroller.signup_get);
router.post('/signup', authConroller.signup_post);
router.get('/login', authConroller.login_get);
router.post('/login', authConroller.login_post);
router.get('/logout', authConroller.logout);

module.exports = router;