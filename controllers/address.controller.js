const Address = require('../models').addresses;
const Buyers = require('../models').buyers;

const { Op } = require('sequelize');

const geocoder = require('../utils/geolocationProvider');

/**
 * Function to create a address
 * @param {*} req
 * @param {*} res
 */
exports.createAddress = async (req, res) => {
  const { address, title, state, country } = req.body;
  const { email, phone } = req._data;
  try {
    const buyerResponse = await Buyers.findOne({
      where: { [Op.or]: [{ email }, { phone }] },
    });

    const output = await geocoder.geocode(address);

    const result = await Address.findOne({
      where: { title, buyer_id: buyerResponse.id },
    });
    if (result !== null) {
      res.status(400).json({
        error: 1,
        msg: 'Address exists!',
      });
    } else {
      const response = await Address.create({
        ...req.body,
        buyer_id: buyerResponse.id,
        latitude: output[0].latitude,
        longitude: output[0].longitude,
        zipcode: output[0].zipcode,
      });
      res.status(201).json({
        error: 0,
        msg: 'Address created successfully!',
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
 * Function to view addresses
 * @param {*} req
 * @param {*} res
 */
exports.viewAddresses = async (req, res) => {
  const { status } = req.query;
  let viewStatus = status === 'true' ? 1 : status === undefined ? null : 0;
  try {
    const result = await Address.findAll({
      include: [
        {
          model: Buyers,
        },
      ],
      where: { status: viewStatus },
    });
    res.status(200).json({
      error: 0,
      msg: 'Available addresses!',
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
 * View a address
 * @param {*} req
 * @param {*} res
 */
exports.viewAddress = async (req, res) => {
  const { address_id } = req.params;
  try {
    const result = await Address.findOne({
      include: [{ model: Buyers }],
      where: { id: address_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Address does not exist!',
        data: result,
      });
    } else {
      res.status(200).json({
        error: 0,
        msg: 'Available address!',
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
 * Update address
 * @param {*} req
 * @param {*} res
 */
exports.updateAddress = async (req, res) => {
  const { address_id } = req.params;
  try {
    const result = await Address.findOne({
      where: { id: address_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Address does not exist!',
        data: result,
      });
    } else {
      const response = await Address.update(req.body, {
        where: { id: address_id },
      });
      res.status(200).json({
        error: 0,
        msg: 'Address updated successfully!',
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
 * Delete address
 * @param {*} req
 * @param {*} res
 */
exports.deleteAddress = async (req, res) => {
  const { address_id } = req.params;
  try {
    const result = await Address.findOne({
      where: { id: address_id },
    });
    if (result === null) {
      res.status(400).json({
        error: 1,
        msg: 'Address does not exist!',
        data: result,
      });
    } else {
      const response = await Address.destroy({
        where: { id: address_id },
      });
      res.status(200).json({
        error: 0,
        msg: 'Address deleted successfully!',
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};
