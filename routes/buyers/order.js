const express = require('express');

const router = express.Router();

const orderController = require('../../controllers/order.controller');
const orderMiddleware = require('../../middlewares/order.middleware');

// create order
router.post(
  '/add',
  orderMiddleware.isInputValidated,
  orderController.createOrder
);

// confirm order
router.post(
  '/confirm',
  orderMiddleware.isConfirmOrderInputValidated,
  orderController.confirmOrder
);

// view orders ?status=initiated | ...
router.get('/', orderController.viewOrders);

// view active orders
router.get('/view', orderController.viewAllOrders);

// view active orders
router.get('/active', orderController.viewActiveOrders);

// view cancelled orders
router.get('/cancelled', orderController.viewCancelledOrders);

// view transaction by ref no
router.get('/trx/:ref_no', orderController.viewTrxByRef);

// view order by ref no
router.get('/:ref_no', orderController.viewOrderByRef);

// view order items by ref no
// router.get('/items/:ref_no', orderController.viewOrderItemsByRef);

module.exports = router;
