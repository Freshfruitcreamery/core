const Varieties = require('../models').varieties;
const Collection = require('../models').collection;
const Items = require('../models').items;
const Buyers = require('../models').buyers;

/**
 * Function to create a variety
 * @param {*} req
 * @param {*} res
 */
exports.createVariety = async (req, res) => {
  const { item_id, collection_id } = req.body;
  try {
    const result = await Varieties.findOne({
      where: { item_id, collection_id },
    });
    if (result !== null) {
      res.status(400).json({
        error: 1,
        msg: 'Variety exists!',
      });
    } else {
      // item
      const itemResult = await Items.findOne({ where: { id: item_id } });
      // collection
      const collectionResult = await Collection.findOne({
        where: { id: collection_id },
      });

      if (itemResult === null) {
        res.status(400).json({
          error: 1,
          msg: 'Item does not exist!',
        });
      } else if (collectionResult === null) {
        res.status(400).json({
          error: 1,
          msg: 'Collection does not exist!',
        });
      } else {
        const response = await Varieties.create({
          ...req.body,
          status: 1,
        });
        res.status(201).json({
          error: 0,
          msg: 'Variety created successfully!',
          data: response,
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Function to view varieties by collection_id
 * @param {*} req
 * @param {*} res
 */
exports.viewVarietiesByCollection = async (req, res) => {
  const { collection_id } = req.params;
  try {
    const result = await Varieties.findAll({
      include: [{ model: Items }, { model: Collection }],
      where: { collection_id },
    });
    res.status(200).json({
      error: 0,
      msg: 'Available varieties!',
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
 * Delete variety
 * @param {*} req
 * @param {*} res
 */
exports.deleteVariety = async (req, res) => {
  const { variety_id } = req.params;
  try {
    const result = await Varieties.findOne({
      where: { id: variety_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Variety does not exist!',
        data: result,
      });
    } else {
      const response = await Varieties.destroy({
        where: { id: variety_id },
      });
      res.status(200).json({
        error: 0,
        msg: 'Variety deleted successfully!',
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};
