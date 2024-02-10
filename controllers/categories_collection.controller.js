const Categories = require('../models').categories;
const CategoriesCollection = require('../models').categories_collection;

/**
 * Function to create a categories collection
 * @param {*} req
 * @param {*} res
 */
exports.createCategoryCollection = async (req, res) => {
  try {
    // Check category
    const category = await Categories.findOne({
      where: { id: req.body.category_id },
    });
    if (!category) {
      return res.status(400).json({
        error: 1,
        msg: 'Category not found!',
      });
    }

    const result = await CategoriesCollection.findOne({
      where: { category_id: req.body.category_id },
    });
    if (result) {
      return res.status(400).json({
        error: 1,
        msg: 'Category exists in collection!',
      });
    } else {
      const response = await CategoriesCollection.create({
        ...req.body,
      });
      return res.status(201).json({
        error: 0,
        msg: 'Category added to collection successfully!',
      });
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
 * Function to view collections for admin
 * @param {*} req
 * @param {*} res
 */
exports.viewCategoriesCollection = async (req, res) => {
  try {
    const result = await CategoriesCollection.findAll({
      include: ['category'],
    });
    res.status(200).json({
      error: 0,
      msg: 'Available categories collection!',
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
 * Function to view collections for clients
 * @param {*} req
 * @param {*} res
 */
exports.viewCategoriesCollectionForClients = async (req, res) => {
  try {
    const result = await CategoriesCollection.findAll({
      include: ['category'],
    });
    res.status(200).json({
      error: 0,
      msg: 'Available collections!',
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
 * View a collection
 * @param {*} req
 * @param {*} res
 */
exports.viewCollection = async (req, res) => {
  const { collection_id } = req.params;
  try {
    const result = await CategoriesCollection.findOne({
      where: { id: collection_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Collection does not exist!',
        data: result,
      });
    } else {
      res.status(200).json({
        error: 0,
        msg: 'Available collection!',
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
 * Update collection
 * @param {*} req
 * @param {*} res
 */
exports.updateCollection = async (req, res) => {
  const { collection_id } = req.params;
  try {
    const result = await CategoriesCollection.findOne({
      where: { id: collection_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Collection does not exist!',
        data: result,
      });
    } else {
      const response = await CategoriesCollection.update(req.body, {
        where: { id: collection_id },
      });
      res.status(200).json({
        error: 0,
        msg: 'Collection updated successfully!',
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
 * Delete collection
 * @param {*} req
 * @param {*} res
 */
exports.deleteCollection = async (req, res) => {
  const { collection_id } = req.params;
  try {
    const result = await CategoriesCollection.findOne({
      where: { id: collection_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Collection does not exist!',
        data: result,
      });
    } else {
      const response = await CategoriesCollection.destroy({
        where: { id: collection_id },
      });
      res.status(200).json({
        error: 0,
        msg: 'Collection deleted successfully!',
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};
