'use strict'
const express = require('express');
const stateController = require('../controllers/state');
const router = express.Router();

router.get('/state', stateController.getStates);
router.get('/state/:id', stateController.getStateById);
router.post('/state', stateController.createState);
router.patch('/state/:id', stateController.updateState);
router.delete('/state/:id', stateController.deleteState);

module.exports = router;