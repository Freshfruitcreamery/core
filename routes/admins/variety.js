const express = require('express');
const router = express.Router();

const varietiesController = require('../../controllers/varieties.controller');
const varietiesMiddleware = require('../../middlewares/variety.middleware');

// create variety
router.post(
  '/create',
  varietiesMiddleware.isInputValidated,
  varietiesController.createVariety
);

// view varieties by collection_id
router.get(
  '/:collection_id/view',
  varietiesController.viewVarietiesByCollection
);

// delete variety
router.delete('/:variety_id', varietiesController.deleteVariety);

module.exports = router;
