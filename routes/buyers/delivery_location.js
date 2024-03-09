const express = require('express');
const router = express.Router();

const deliveryLocationController = require('../../controllers/delivery_location.controller');

// view delivery locations
router.get('/view', deliveryLocationController.viewPublicDeliveryLocations);

module.exports = router;
