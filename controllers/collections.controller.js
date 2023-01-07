const Collections = require('../models').collection;

const otpGenerator = require('otp-generator');

/**
 * Function to create a collection
 * @param {*} req
 * @param {*} res
 */
exports.createCollection = async (req, res) => {
  try {
    const result = await Collections.findOne({
      where: { name: req.body.name },
    });
    if (result !== null) {
      res.status(400).json({
        error: 1,
        msg: 'Collection exists!',
      });
    } else {
      const response = await Collections.create({
        ...req.body,
        status: 1,
      });
      res.status(201).json({
        error: 0,
        msg: 'Collection created successfully!',
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
 * Function to view collections
 * @param {*} req
 * @param {*} res
 */
exports.viewCollections = async (req, res) => {
  const { status } = req.query;
  let viewStatus = status === 'true' ? 1 : 0;
  try {
    const result = await Collections.findAll({
      where: { status: viewStatus },
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
    const result = await Collections.findOne({
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
    const result = await Collections.findOne({
      where: { id: collection_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Collection does not exist!',
        data: result,
      });
    } else {
      const response = await Collections.update(req.body, {
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
    const result = await Collections.findOne({
      where: { id: collection_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Collection does not exist!',
        data: result,
      });
    } else {
      const response = await Collections.destroy({
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
