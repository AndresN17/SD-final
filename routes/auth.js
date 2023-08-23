'use strict'
const express = require('express');
const authController = require('../controllers/auth');
const { body } = require('express-validator');
const router = express.Router();

router.put('/signup',
    body('email')
        .trim()
        .isEmail()
        .withMessage("Please enter a valid email")
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 8 }),
    authController.signup);
router.post('/login', authController.login);


module.exports = router;