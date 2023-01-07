const express = require('express');

const router = express.Router();

const categoriesController = require('../../controllers/categories.controller');

// view categories (activated and deactivated) ?status=true | false &type=sub &cat=${cat_id}
router.get('/', categoriesController.viewCategories);

// view category
router.get('/:cat_id', categoriesController.viewCategory);

module.exports = router;
