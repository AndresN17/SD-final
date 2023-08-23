'use strict'
const express = require('express');
const provinceController = require('../controllers/province');
const router = express.Router();

router.get('/province', provinceController.getProvinces);
router.get('/province/:id', provinceController.getProvinceById);
router.post('/province', provinceController.createProvince);
router.patch('/province/:id', provinceController.updateProvince);
router.delete('/province/:id', provinceController.deleteProvince);

module.exports = router;