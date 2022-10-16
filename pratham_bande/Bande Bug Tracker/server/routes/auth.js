const express = require('express');
const router = express.Router();


const authController = require('../controller/auth');


router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.post('/cookie-check', authController.cookieCheck);

router.post('/signup', authController.postSignup);

module.exports = router;