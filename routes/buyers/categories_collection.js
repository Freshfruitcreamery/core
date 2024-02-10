const express = require('express');
const router = express.Router();

const categoriesCollectionController = require('../../controllers/categories_collection.controller');
const categoriesCollectionMiddleware = require('../../middlewares/categories_collection.middleware');

// add category to collection
router.post(
  '/create',
  categoriesCollectionMiddleware.isInputValidated,
  categoriesCollectionController.createCategoryCollection
);

// view categories in collection
router.get('/view', categoriesCollectionController.viewCategoriesCollection);

// view collection
// router.get('/:collection_id/view', categoriesCollectionController.viewCollection);

// update collection
// router.put('/:collection_id/update', categoriesCollectionController.updateCollection);

// delete collection
// router.delete('/:collection_id', categoriesCollectionController.deleteCollection);

module.exports = router;
