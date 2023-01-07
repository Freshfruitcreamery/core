const express = require('express');
const router = express.Router();

const orderController = require('../../controllers/order.controller');
const orderMiddleware = require('../../middlewares/order.middleware');

// create order
// router.post(
//   '/create',
//   orderMiddleware.isInputValidatedForAdmin,
//   orderController.createOrderForAdmin
// );

// view orders
router.get('/', orderController.viewOrdersForAdmin);

// view order items by ref no or buyer id ?status=true
router.get('/items/buyer/:buyer_id', orderController.viewBuyersOrders);

// view order items by ref no or buyer id ?status=true
router.get('/items/ref/:ref_no', orderController.viewOrderByRef);

// view order items by ref no or buyer id ?status=true
router.get('/ref/:ref_no', orderController.viewTrxByRef);

// update order
router.put('/:ref_no', orderController.updateOrder);

// update order
router.put('/items/ref/:id', orderController.updateOrderItems);

// delete order
router.delete('/:ref_no', orderController.deleteOrder);

// view items (activated and deactivated) ?status=true | false
// router.get('/view', itemsController.viewItems);

// view items comments (activated and deactivated) ?status=true | false
// router.get('/comment/:item_id', commentController.viewCommentsByItemID);

// view item
// router.get('/:item_id/view', itemsController.viewItem);

// update item
// router.put('/:item_id/update', itemsController.updateItem);

// delete item
// router.delete('/:item_id', itemsController.deleteItem);

module.exports = router;
