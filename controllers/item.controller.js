const Items = require('../models').items;
const Categories = require('../models').categories;

const { Op } = require('sequelize');

const { foodTypes } = require('../utils/types');

/**
 * Function to create a item
 * @param {*} req
 * @param {*} res
 */
exports.createItem = async (req, res) => {
  const { type } = req.body;
  try {
    const result = await Items.findOne({ where: { name: req.body.name } });
    if (result !== null) {
      res.status(400).json({
        error: 1,
        msg: 'Item exists!',
      });
    } else if (foodTypes.filter((foodType) => foodType === type).length === 0) {
      res.status(400).json({
        error: 1,
        msg: `Food type is not recognized! Here are the options: ${foodTypes.map(
          (foodType) => foodType
        )}`,
      });
    } else {
      const response = await Items.create({
        ...req.body,
        status: 1,
      });
      res.status(201).json({
        error: 0,
        msg: 'Item created successfully!',
        data: response,
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
 * Function to view items
 * @param {*} req
 * @param {*} res
 */
exports.viewItems = async (req, res) => {
  let { status, cat, q, type } = req.query;
  let viewStatus = status === 'true' ? 1 : 0;
  let catWhere =
    cat !== undefined && q !== undefined
      ? {
          [Op.or]: [
            {
              cat_id: cat,
            },
            {
              parent_cat_id: cat,
            },
            {
              grand_parent_id: cat,
            },
            { name: { [Op.like]: `%${q}%` } },
            {
              '$category.name$': { [Op.like]: `%${q}%` },
            },
          ],
        }
      : cat !== undefined
      ? {
          [Op.or]: [
            {
              cat_id: cat,
            },
            {
              parent_cat_id: cat,
            },
            {
              grand_parent_id: cat,
            },
          ],
        }
      : q !== undefined
      ? {
          [Op.or]: [
            {
              name: { [Op.like]: `%${q}%` },
            },
            {
              '$category.name$': { [Op.like]: `%${q}%` },
            },
          ],
        }
      : null;

  // type = Boolean(type) ? { type } : null;

  try {
    const result = await Items.findAll({
      include: [
        {
          // as: 'parent_cat',
          model: Categories,
        },
      ],
      where: { status: viewStatus, ...catWhere },
    });

    return res.status(200).json({
      error: 0,
      msg: 'Available items!',
      data: result,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * View a item
 * @param {*} req
 * @param {*} res
 */
exports.viewItem = async (req, res) => {
  const { item_id } = req.params;
  try {
    const result = await Items.findOne({
      include: [{ model: Categories }],
      where: { id: item_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Item does not exist!',
        data: result,
      });
    } else {
      res.status(200).json({
        error: 0,
        msg: 'Available item!',
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
 * Update item
 * @param {*} req
 * @param {*} res
 */
exports.updateItem = async (req, res) => {
  const { item_id } = req.params;
  try {
    const result = await Items.findOne({
      where: { id: item_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Item does not exist!',
        data: result,
      });
    } else {
      const response = await Items.update(req.body, {
        where: { id: item_id },
      });
      res.status(200).json({
        error: 0,
        msg: 'Item updated successfully!',
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
 * Delete item
 * @param {*} req
 * @param {*} res
 */
exports.deleteItem = async (req, res) => {
  const { item_id } = req.params;
  try {
    const result = await Items.findOne({
      where: { id: item_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Item does not exist!',
        data: result,
      });
    } else {
      const response = await Items.destroy({
        where: { id: item_id },
      });
      res.status(200).json({
        error: 0,
        msg: 'Item deleted successfully!',
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};
