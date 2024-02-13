const Categories = require('../models').categories;

const { categoryTypes } = require('../utils/types');
const { Op } = require('sequelize');

/**
 * Function to create a category
 * @param {*} req
 * @param {*} res
 */
exports.createCategory = async (req, res) => {
  try {
    console.log(req.body);
    let { type, name, parent_cat_id, child_cat_id, sub_child_cat_id } =
      req.body;
    if (!sub_child_cat_id) {
      sub_child_cat_id = null;
    }
    const result = await Categories.findOne({
      where: { name, parent_cat_id, child_cat_id, sub_child_cat_id },
    });
    if (result !== null) {
      res.status(400).json({
        error: 1,
        msg: 'Category exists!',
      });
    } else {
      const cat_type = categoryTypes.filter((t) => t === type);
      if (cat_type.length === 0) {
        res.status(400).json({
          error: 1,
          msg: 'Type does not exist!',
        });
      } else {
        const response = await Categories.create({
          ...req.body,
          type: cat_type[0],
          status: 1,
        });
        res.status(201).json({
          error: 0,
          msg: 'Category created successfully!',
          data: response,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Function to view categories
 * @param {*} req
 * @param {*} res
 */
exports.viewCategories = async (req, res) => {
  const { status, type, cat } = req.query;
  let viewStatus = status === 'true' ? 1 : 0;
  let typeStatus = {};

  if (type !== undefined) {
    typeStatus.type = type;
    if (cat !== undefined) {
      if (type === 'sub2') {
        typeStatus.child_cat_id = cat;
      } else if (type === 'sub3') {
        typeStatus.sub_child_cat_id = cat;
      } else {
        typeStatus.parent_cat_id = cat;
      }
    }
  } else if (cat !== undefined) {
    typeStatus.parent_cat_id = cat;
  }

  try {
    const result = await Categories.findAll({
      where: { status: viewStatus, ...typeStatus },
      order: [['createdAt', 'ASC']],
    });
    res.status(200).json({
      error: 0,
      msg: 'Available categories!',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * View a category
 * @param {*} req
 * @param {*} res
 */
exports.viewCategory = async (req, res) => {
  const { cat_id } = req.params;
  try {
    const result = await Categories.findOne({
      where: { id: cat_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Category does not exist!',
        data: result,
      });
    } else {
      res.status(200).json({
        error: 0,
        msg: 'Available category!',
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
 * Update category
 * @param {*} req
 * @param {*} res
 */
exports.updateCategory = async (req, res) => {
  const { cat_id } = req.params;
  try {
    const result = await Categories.findOne({
      where: { id: cat_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Category does not exist!',
        data: result,
      });
    } else {
      const response = await Categories.update(req.body, {
        where: { id: cat_id },
      });
      res.status(200).json({
        error: 0,
        msg: 'Category updated successfully!',
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
 * Delete category
 * @param {*} req
 * @param {*} res
 */
exports.deleteCategory = async (req, res) => {
  const { cat_id } = req.params;
  try {
    const result = await Categories.findOne({
      where: { id: cat_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Category does not exist!',
        data: result,
      });
    } else {
      const response = await Categories.destroy({
        where: { id: cat_id },
      });
      res.status(200).json({
        error: 0,
        msg: 'Category deleted successfully!',
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};
