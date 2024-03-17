const express = require('express');
const router = express.Router();

const deliveryDistanceController = require('../../controllers/delivery_distance.controller');
const deliveryDistanceMiddleware = require('../../middlewares/delivery_distance.middleware');

// add delivery distance
router.post(
  '/create',
  deliveryDistanceMiddleware.isInputValidated,
  deliveryDistanceController.createDeliveryDistance
);

// view delivery distances
router.get('/view', deliveryDistanceController.viewDeliveryDistances);

// view delivery distance
router.get(
  '/:distance_id/view',
  deliveryDistanceController.viewDeliveryDistance
);

// update delivery distance
router.put(
  '/:distance_id/update',
  deliveryDistanceController.updateDeliveryDistance
);

// delete delivery distance
router.delete(
  '/:distance_id',
  deliveryDistanceController.deleteDeliveryDistance
);

module.exports = router;
