const express = require('express');

const router = express.Router();

const itemsController = require('../../controllers/item.controller');
const varietiesController = require('../../controllers/varieties.controller');

// view items (activated and deactivated) ?status=true | false & cat=${cat_id} & q=${q}
router.get('/', itemsController.viewItems);

// view items by collection
router.get(
  '/collection/:collection_id',
  varietiesController.viewVarietiesByCollection
);

// view item
router.get('/:item_id', itemsController.viewItem);

module.exports = router;
