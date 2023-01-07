const express = require('express');

const router = express.Router();

const addressController = require('../../controllers/address.controller');
const addressMiddleware = require('../../middlewares/address.middleware');

// create address
router.post(
  '/add',
  addressMiddleware.isInputValidated,
  addressController.createAddress
);

// view addresses
router.get('/', addressController.viewAddresses);

// view address
router.get('/:address_id', addressController.viewAddress);

// update address
router.put('/:address_id', addressController.updateAddress);

// delete address
router.delete('/:address_id', addressController.deleteAddress);

module.exports = router;
