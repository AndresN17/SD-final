'use strict'
const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const warehouseController = require('../controllers/warehouse');

router.get('/warehouse', /* isAuth, */ warehouseController.getWarehouse);
router.get('/warehouse/:id', /* isAuth, */ warehouseController.getWarehouseById);
router.post('/warehouse', /* isAuth, */ warehouseController.createWarehouse);
router.patch('/warehouse/:id', /* isAuth,  */warehouseController.updateWarehouse);
router.delete('/warehouse/:id', /* isAuth, */ warehouseController.deleteWarehouse);

module.exports = router;