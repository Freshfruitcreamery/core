const express = require('express');

const router = express.Router();

const commentController = require('../../controllers/comment.controller');
const commentMiddleware = require('../../middlewares/comment.middleware');

// create comment
router.post(
  '/add',
  commentMiddleware.isInputValidated,
  commentController.createComment
);

// view comments by item_id
router.get('/:item_id', commentController.viewCommentsByItemID);

module.exports = router;
