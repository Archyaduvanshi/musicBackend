const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');


router.post('/register',authController.registeruser);
router.post('/login',authController.loginuser);
router.post('/logout',authController.logoutuser);



module.exports = router;