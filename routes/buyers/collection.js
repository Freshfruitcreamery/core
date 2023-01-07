const express = require('express');
const router = express.Router();

const collectionsController = require('../../controllers/collections.controller');

// view collections (activated and deactivated) ?status=true | false
router.get('/view', collectionsController.viewCollections);

// view collection
router.get('/:collection_id/view', collectionsController.viewCollection);


module.exports = router;
