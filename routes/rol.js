'use strict'
const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rol');

router.get('/rol', rolController.getRols);
router.get('/rol/:id', rolController.getRolById);
router.post('/rol', rolController.createRol);
router.patch('/rol/:id', rolController.updateRol);
router.delete('/rol/:id', rolController.deleteRol);

module.exports = router;