'use strict'
const express = require('express');
const membershipController = require('../controllers/membership');
const router = express.Router();

router.get('/membership', membershipController.getMembership);
router.get('/membership/:id', membershipController.getMembershipById);
router.post('/membership', membershipController.createMembership);
router.patch('/membership/:id', membershipController.updateMembership);
router.delete('/membership/:id', membershipController.deleteMembresia);

module.exports = router;