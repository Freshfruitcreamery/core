const DeliveryDistances = require('../models').delivery_distances;

/**
 * Function to create a delivery distance
 * @param {*} req
 * @param {*} res
 */
exports.createDeliveryDistance = async (req, res) => {
  try {
    // Check distance from and to
    const distance = await DeliveryDistances.findOne({
      where: {
        distance_from: req.body.distance_from,
        distance_to: req.body.distance_to,
      },
    });
    if (distance) {
      return res.status(400).json({
        error: 1,
        msg: 'Distance exists!',
      });
    }

    await DeliveryDistances.create({
      ...req.body,
    });
    return res.status(201).json({
      error: 0,
      msg: 'Delivery distance added successfully.',
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
 * Function to view delivery distances for admin
 * @param {*} req
 * @param {*} res
 */
exports.viewDeliveryDistances = async (req, res) => {
  try {
    let where = {};

    const result = await DeliveryDistances.findAll({ where });

    res.status(200).json({
      error: 0,
      msg: 'Available delivery distances',
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
 * Function to view delivery distances for admin
 * @param {*} req
 * @param {*} res
 */
exports.viewDeliveryDistance = async (req, res) => {
  try {
    const result = await DeliveryDistances.findOne({
      where: { id: req.params.distance_id },
    });

    res.status(200).json({
      error: 0,
      msg: 'Available delivery distance',
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
 * Function to view delivery distance (public to buyers)
 * @param {*} req
 * @param {*} res
 */
exports.viewPublicDeliveryDistances = async (req, res) => {
  try {
    const where = {
      is_public: true,
    };

    const result = await DeliveryDistances.findAll({
      where,
    });

    res.status(200).json({
      error: 0,
      msg: 'Available delivery distances',
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
 * Update delivery distance
 * @param {*} req
 * @param {*} res
 */
exports.updateDeliveryDistance = async (req, res) => {
  const { distance_id } = req.params;
  try {
    const result = await DeliveryDistances.findOne({
      where: { id: distance_id },
    });
    if (!result) {
      return res.status(400).json({
        error: 1,
        msg: 'Delivery distance does not exist!',
      });
    }
    await DeliveryDistances.update(req.body, {
      where: { id: distance_id },
    });
    return res.status(200).json({
      error: 0,
      msg: 'Delivery distance updated successfully!',
    });
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Delete delivery distance
 * @param {*} req
 * @param {*} res
 */
exports.deleteDeliveryDistance = async (req, res) => {
  const { distance_id } = req.params;
  try {
    const result = await DeliveryDistances.findOne({
      where: { id: distance_id },
    });
    if (!result) {
      return res.status(400).json({
        error: 1,
        msg: 'Delivery distance does not exist.',
      });
    }

    if (result.is_public) {
      return res.status(400).json({
        error: 1,
        msg: 'Delivery distance made public cannot be deleted.',
      });
    }

    await DeliveryDistances.destroy({
      where: { id: distance_id },
    });

    return res.status(200).json({
      error: 0,
      msg: 'Delivery distance deleted successfully.',
    });
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};
