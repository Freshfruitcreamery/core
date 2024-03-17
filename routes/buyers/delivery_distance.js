const express = require('express');
const router = express.Router();

const deliveryDistanceController = require('../../controllers/delivery_distance.controller');

// view delivery distance
router.get('/view', deliveryDistanceController.viewPublicDeliveryDistances);

module.exports = router;
