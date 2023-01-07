const express = require('express');
const router = express.Router();

const itemsController = require('../../controllers/item.controller');
const itemsMiddleware = require('../../middlewares/item.middleware');

const commentController = require('../../controllers/comment.controller');

// create item
router.post(
  '/create',
  itemsMiddleware.isInputValidated,
  itemsController.createItem
);

// view items (activated and deactivated) ?status=true | false & q=${q} & cat=${cat} & type = ${type} food | addition
router.get('/view', itemsController.viewItems);

// view items comments (activated and deactivated) ?status=true | false
router.get('/comment/:item_id', commentController.viewCommentsByItemID);

// view item
router.get('/:item_id/view', itemsController.viewItem);

// update item
router.put('/:item_id/update', itemsController.updateItem);

// delete item
router.delete('/:item_id', itemsController.deleteItem);

module.exports = router;
