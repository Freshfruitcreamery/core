const Comment = require('../models').comments;
const Buyers = require('../models').buyers;
const Item = require('../models').items;

const { Op } = require('sequelize');

/**
 * Function to create a comment
 * @param {*} req
 * @param {*} res
 */
exports.createComment = async (req, res) => {
  const { item_id } = req.body;
  const { email, phone } = req._data;
  try {
    const itemResponse = await Item.findOne({ where: { id: item_id } });

    const buyerResponse = await Buyers.findOne({
      where: { [Op.or]: [{ email }, { phone }] },
    });

    if (itemResponse === null) {
      res.status(400).json({
        error: 1,
        msg: 'Item does not exist!',
      });
    } else {
      const response = await Comment.create({
        ...req.body,
        buyer_id: buyerResponse.id,
        status: 1,
      });
      res.status(201).json({
        error: 0,
        msg: 'Comment created successfully!',
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
 * Function to view comments through item id
 * @param {*} req
 * @param {*} res
 */
exports.viewCommentsByItemID = async (req, res) => {
  const { item_id } = req.params;
  const { status } = req.query;
  let viewStatus = status === 'true' ? 1 : 0;
  try {
    const result = await Comment.findAll({
      include: [{ model: Buyers }, { model: Item }],
      where: { status: viewStatus, item_id },
    });

    res.status(200).json({
      error: 0,
      msg: 'Available comments!',
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
 * Update comment
 * @param {*} req
 * @param {*} res
 */
exports.updateComment = async (req, res) => {
  const { comment_id } = req.params;
  try {
    const result = await Comment.findOne({
      where: { id: comment_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Comment does not exist!',
        data: result,
      });
    } else {
      const response = await Comment.update(req.body, {
        where: { id: comment_id },
      });
      res.status(200).json({
        error: 0,
        msg: 'Comment updated successfully!',
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
 * Delete comment
 * @param {*} req
 * @param {*} res
 */
exports.deleteComment = async (req, res) => {
  const { comment_id } = req.params;
  try {
    const result = await Comment.findOne({
      where: { id: comment_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Comment does not exist!',
        data: result,
      });
    } else {
      const response = await Comment.destroy({
        where: { id: comment_id },
      });
      res.status(200).json({
        error: 0,
        msg: 'Comment deleted successfully!',
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};
