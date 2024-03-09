const express = require('express');
const router = express.Router();

const deliveryLocationController = require('../../controllers/delivery_location.controller');
const deliveryLocationMiddleware = require('../../middlewares/delivery_location.middleware');

// add delivery locaton
router.post(
  '/create',
  deliveryLocationMiddleware.isInputValidated,
  deliveryLocationController.createDeliveryLocation
);

// view delivery locations
router.get('/view', deliveryLocationController.viewDeliveryLocations);

// view delivery location
router.get(
  '/:location_id/view',
  deliveryLocationController.viewDeliveryLocation
);

// update delivery location
router.put(
  '/:location_id/update',
  deliveryLocationController.updateDeliveryLocation
);

// delete delivery location
router.delete(
  '/:location_id',
  deliveryLocationController.deleteDeliveryLocation
);

module.exports = router;
