const express = require('express');
const router = express.Router();

const categoriesController = require('../../controllers/categories.controller');
const categoriesMiddleware = require('../../middlewares/category.middleware');

// create category
router.post(
  '/create',
  categoriesMiddleware.isInputValidated,
  categoriesController.createCategory
);

// view categories (activated and deactivated) ?status=true | false &type=sub1 | sub2 | parent &cat=${cat_id}
router.get('/view', categoriesController.viewCategories);

// view category
router.get('/:cat_id/view', categoriesController.viewCategory);

// update category
router.put('/:cat_id/update', categoriesController.updateCategory);

// delete category
router.delete('/:cat_id', categoriesController.deleteCategory);

module.exports = router;
