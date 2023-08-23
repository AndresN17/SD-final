'use strict'
const express = require('express');
const cityController = require('../controllers/city');
const router = express.Router();

router.get('/city', cityController.getCities);
router.get('/city/:id', cityController.getCityById);
router.post('/city', cityController.createCity);
router.patch('/city/:id', cityController.updateCity);
router.delete('/city/:id', cityController.deleteCity);

module.exports = router;