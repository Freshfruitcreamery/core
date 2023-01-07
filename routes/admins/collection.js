const express = require('express');
const router = express.Router();

const collectionsController = require('../../controllers/collections.controller');
const collectionsMiddleware = require('../../middlewares/collection.middleware');

// create collection
router.post(
  '/create',
  collectionsMiddleware.isInputValidated,
  collectionsController.createCollection
);

// view collections (activated and deactivated) ?status=true | false
router.get('/view', collectionsController.viewCollections);

// view collection
router.get('/:collection_id/view', collectionsController.viewCollection);

// update collection
router.put('/:collection_id/update', collectionsController.updateCollection);

// delete collection
router.delete('/:collection_id', collectionsController.deleteCollection);

module.exports = router;
