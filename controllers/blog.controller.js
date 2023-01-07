const Blog = require('../models').blog;

/**
 * Function to create a blog
 * @param {*} req
 * @param {*} res
 */
exports.createBlog = async (req, res) => {
  try {
    const result = await Blog.findOne({ where: { title: req.body.title } });
    if (result !== null) {
      res.status(400).json({
        error: 1,
        msg: 'Blog post exists!',
      });
    } else {
      const response = await Blog.create({
        ...req.body,
        status: 1,
      });
      res.status(201).json({
        error: 0,
        msg: 'Blog post created successfully!',
        data: response,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Function to view blog posts
 * @param {*} req
 * @param {*} res
 */
exports.viewBlogPosts = async (req, res) => {
  const { status } = req.query;
  let viewStatus = status === 'true' ? 1 : 0;
  try {
    const result = await Blog.findAll({
      where: { status: viewStatus },
    });
    res.status(200).json({
      error: 0,
      msg: 'Available blog posts!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * View a blog
 * @param {*} req
 * @param {*} res
 */
exports.viewBlog = async (req, res) => {
  const { blog_id } = req.params;
  try {
    const result = await Blog.findOne({
      where: { id: blog_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Blog post does not exist!',
        data: result,
      });
    } else {
      res.status(200).json({
        error: 0,
        msg: 'Available blog post!',
        data: result,
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Update blog
 * @param {*} req
 * @param {*} res
 */
exports.updateBlog = async (req, res) => {
  const { blog_id } = req.params;
  try {
    const result = await Blog.findOne({
      where: { id: blog_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Blog post does not exist!',
        data: result,
      });
    } else {
      const response = await Blog.update(req.body, {
        where: { id: blog_id },
      });
      res.status(200).json({
        error: 0,
        msg: 'Blog post updated successfully!',
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Delete blog
 * @param {*} req
 * @param {*} res
 */
exports.deleteBlog = async (req, res) => {
  const { blog_id } = req.params;
  try {
    const result = await Blog.findOne({
      where: { id: blog_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Blog post does not exist!',
        data: result,
      });
    } else {
      const response = await Blog.destroy({
        where: { id: blog_id },
      });
      res.status(200).json({
        error: 0,
        msg: 'Blog post deleted successfully!',
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};
