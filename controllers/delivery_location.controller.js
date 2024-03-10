const DeliveryLocations = require('../models').delivery_locations;

/**
 * Function to create a delivery location
 * @param {*} req
 * @param {*} res
 */
exports.createDeliveryLocation = async (req, res) => {
  try {
    // Check delivery location
    const location = await DeliveryLocations.findOne({
      where: { location: req.body.location },
    });
    if (location) {
      return res.status(400).json({
        error: 1,
        msg: 'Location exists!',
      });
    }

    await DeliveryLocations.create({
      ...req.body,
    });
    return res.status(201).json({
      error: 0,
      msg: 'Delivery location added successfully.',
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
 * Function to view delivery locations for admin
 * @param {*} req
 * @param {*} res
 */
exports.viewDeliveryLocations = async (req, res) => {
  try {
    const { area } = req.query;
    let where = {};
    if (area) {
      where.area = area;
    }
    const result = await DeliveryLocations.findAll({ where });

    res.status(200).json({
      error: 0,
      msg: 'Available delivery locations',
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
 * Function to view delivery location for admin
 * @param {*} req
 * @param {*} res
 */
exports.viewDeliveryLocation = async (req, res) => {
  try {
    const result = await DeliveryLocations.findOne({
      where: { id: req.params.location_id },
    });

    res.status(200).json({
      error: 0,
      msg: 'Available delivery location',
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
 * Function to view delivery locations (public to buyers)
 * @param {*} req
 * @param {*} res
 */
exports.viewPublicDeliveryLocations = async (req, res) => {
  try {
    const { area } = req.query;
    const where = {
      is_public: true,
    };
    if (area) {
      where.area = area;
    }
    const result = await DeliveryLocations.findAll({
      where,
    });

    res.status(200).json({
      error: 0,
      msg: 'Available delivery locations',
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
 * Update delivery location
 * @param {*} req
 * @param {*} res
 */
exports.updateDeliveryLocation = async (req, res) => {
  const { location_id } = req.params;
  try {
    const result = await DeliveryLocations.findOne({
      where: { id: location_id },
    });
    if (!result) {
      return res.status(400).json({
        error: 1,
        msg: 'Delivery location does not exist!',
      });
    }
    await DeliveryLocations.update(req.body, {
      where: { id: location_id },
    });
    return res.status(200).json({
      error: 0,
      msg: 'Delivery location updated successfully!',
    });
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Delete delivery location
 * @param {*} req
 * @param {*} res
 */
exports.deleteDeliveryLocation = async (req, res) => {
  const { location_id } = req.params;
  try {
    const result = await DeliveryLocations.findOne({
      where: { id: location_id },
    });
    if (!result) {
      return res.status(400).json({
        error: 1,
        msg: 'Delivery location does not exist.',
      });
    }

    if (result.is_public) {
      return res.status(400).json({
        error: 1,
        msg: 'Delivery location made public cannot be deleted.',
      });
    }

    await DeliveryLocations.destroy({
      where: { id: location_id },
    });

    return res.status(200).json({
      error: 0,
      msg: 'Delivery location deleted successfully.',
    });
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};
