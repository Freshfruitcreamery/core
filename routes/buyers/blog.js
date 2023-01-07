const express = require('express');

const router = express.Router();

const blogController = require('../../controllers/blog.controller');

// view blog posts (activated and deactivated) ?status=true | false
router.get('/', blogController.viewBlogPosts);

// view blog post
router.get('/:blog_id', blogController.viewBlog);

module.exports = router;
