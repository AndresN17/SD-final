'use strict'
const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const userController = require('../controllers/user');

router.get('/user', userController.getUsers);
router.get('/user/:id', userController.getUserById);
router.post('/user', userController.createUser);
router.patch('/user/:id', userController.editUser);
router.delete('/user/:id', isAuth, userController.deleteUser);

module.exports = router;