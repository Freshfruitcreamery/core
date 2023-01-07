const express = require('express');
const router = express.Router();

const blogController = require('../../controllers/blog.controller');
const blogMiddleware = require('../../middlewares/blog.middleware');

// create blog
router.post(
  '/create',
  blogMiddleware.isInputValidated,
  blogController.createBlog
);

// view blog posts (activated and deactivated) ?status=true | false
router.get('/view', blogController.viewBlogPosts);

// view blog
router.get('/:blog_id/view', blogController.viewBlog);

// update blog
router.put('/:blog_id/update', blogController.updateBlog);

// delete blog
router.delete('/:blog_id', blogController.deleteBlog);

module.exports = router;
