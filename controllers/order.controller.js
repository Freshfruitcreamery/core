const Buyers = require('../models').buyers;
const Items = require('../models').items;
const Orders = require('../models').orders;
const Transactions = require('../models').transactions;

const orderService = require('../services/order.service');

const { Op } = require('sequelize');

const {
  TermiiMailProvider,
  mailer_template,
  Mailer,
  Logo,
} = require('../utils/mailer/Engine');

/**
 * Function to create a order
 * @param {*} req
 * @param {*} res
 */
exports.createOrder = async (req, res) => {
  const { email, phone, client } = req._data;
  try {
    let buyerResponse = await Buyers.findOne({
      where: { [Op.or]: [{ email }, { phone }] },
    });
    const buyerData = { ...buyerResponse.toJSON(), client };
    console.log(buyerResponse);
    const response = await orderService.createAnOrder(req.body, buyerData);

    return res.status(201).json({
      error: 0,
      msg: `Order created successfully.`,
      data: response,
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
 * Function to create a order for admin
 * @param {*} req
 * @param {*} res
 */
exports.createOrderForAdmin = async (req, res) => {
  const { buyer_id } = req.body;
  try {
    const buyerResponse = await Buyers.findOne({
      where: { id: buyer_id },
    });

    const response = await orderService.createAnOrder(req.body, buyerResponse);

    return res.status(201).json({
      error: 0,
      msg: `Order created successfully.`,
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Function to confirm order
 * @param {*} req
 * @param {*} res
 */
exports.confirmOrder = async (req, res) => {
  const { email, phone } = req._data;
  try {
    const buyerResponse = await Buyers.findOne({
      where: { [Op.or]: [{ email }, { phone }] },
    });

    const response = await orderService.confirmOrder(req.body, buyerResponse);

    return res.status(200).json({
      error: 0,
      msg: `Order confirmed successfully.`,
      data: response,
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
 * Function to update order
 * @param {*} req
 * @param {*} res
 */
exports.updateOrder = async (req, res) => {
  const { ref_no } = req.params;
  try {
    const response = await orderService.updateOrder(
      req.body,
      req._data,
      ref_no
    );

    return res.status(200).json({
      error: 0,
      msg: `Order updated successfully.`,
      data: response,
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
 * Function to update order items
 * @param {*} req
 * @param {*} res
 */
exports.updateOrderItems = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await orderService.updateOrderItems(req.body, id);

    return res.status(200).json({
      error: 0,
      msg: `Order items updated successfully.`,
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Function to delete order items
 * @param {*} req
 * @param {*} res
 */
exports.deleteOrder = async (req, res) => {
  const { ref_no } = req.params;
  try {
    const response = await orderService.deleteOrder(ref_no);

    return res.status(200).json({
      error: 0,
      msg: `Order deleted successfully.`,
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Function to view orders - admin
 * @param {*} req
 * @param {*} res
 */
exports.viewOrders = async (req, res) => {
  let { status } = req.query;
  const { email, phone } = req._data;
  const statusWhere = status === undefined ? null : { status };
  try {
    const buyerResponse = await Buyers.findOne({
      where: { [Op.or]: [{ email }, { phone }] },
    });

    const result = await Transactions.findAll({
      include: [{ model: Buyers }],
      where: { ...statusWhere },
    });

    res.status(200).json({
      error: 0,
      msg: 'Available orders!',
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
 * Function to view active orders
 * @param {*} req
 * @param {*} res
 */
exports.viewActiveOrders = async (req, res) => {
  let { status } = req.query;
  const { email, phone } = req._data;
  // const statusWhere = status === undefined ? null : { status };
  try {
    const buyerResponse = await Buyers.findOne({
      where: { [Op.or]: [{ email }, { phone }] },
    });

    const result = await Transactions.findAll({
      include: [{ model: Buyers }],
      where: { buyer_id: buyerResponse.id, status: { [Op.not]: 'failed' } },
      order: [['id', 'DESC']],
    });

    res.status(200).json({
      error: 0,
      msg: 'Available orders!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

exports.viewAllOrders = async (req, res) => {
  let { status } = req.query;
  const { email, phone } = req._data;
  // const statusWhere = status === undefined ? null : { status };
  try {
    const buyerResponse = await Buyers.findOne({
      where: { [Op.or]: [{ email }, { phone }] },
    });

    const result = await Transactions.findAll({
      include: [{ model: Buyers }],
      where: { buyer_id: buyerResponse.id },
      order: [['id', 'DESC']],
    });

    res.status(200).json({
      error: 0,
      msg: 'Available orders!',
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
 * Function to view cancelled orders
 * @param {*} req
 * @param {*} res
 */
exports.viewCancelledOrders = async (req, res) => {
  let { status } = req.query;
  const { email, phone } = req._data;
  try {
    const buyerResponse = await Buyers.findOne({
      where: { [Op.or]: [{ email }, { phone }] },
    });

    const result = await Transactions.findAll({
      include: [{ model: Buyers }],
      where: { buyer_id: buyerResponse.id, status: 'failed' },
      order: [['id', 'DESC']],
    });

    res.status(200).json({
      error: 0,
      msg: 'Available orders!',
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
 * Function to view orders for admin
 * @param {*} req
 * @param {*} res
 */
exports.viewOrdersForAdmin = async (req, res) => {
  let { status } = req.query;
  const statusWhere = status === undefined ? null : { status };
  try {
    const result = await Transactions.findAll({
      include: [{ model: Buyers }],
      where: { ...statusWhere },
      order: [['id', 'DESC']],
    });

    res.status(200).json({
      error: 0,
      msg: 'Available orders!',
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
 * Function to view buyers orders for admin
 * @param {*} req
 * @param {*} res
 */
exports.viewBuyersOrders = async (req, res) => {
  let { status } = req.query;
  const { buyer_id } = req.params;
  const statusWhere = status === undefined ? null : { status };
  try {
    const result = await Transactions.findAll({
      include: [{ model: Buyers }],
      where: { buyer_id, ...statusWhere },
      order: [['id', 'DESC']],
    });

    res.status(200).json({
      error: 0,
      msg: 'Available orders!',
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
 * Function to view trx by ref no
 * @param {*} req
 * @param {*} res
 */
exports.viewTrxByRef = async (req, res) => {
  const { ref_no } = req.params;
  try {
    const result = await Transactions.findOne({
      include: [{ model: Buyers }],
      where: { ref: ref_no },
    });

    if (result.length === 0) {
      res.status(400).json({
        error: 1,
        msg: 'Trx does not exist!',
        data: result,
      });
    } else {
      res.status(200).json({
        error: 0,
        msg: 'Available Trx!',
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
 * Function to view order items by ref no
 * @param {*} req
 * @param {*} res
 */
exports.viewOrderByRef = async (req, res) => {
  const { ref_no } = req.params;
  try {
    const result = await Orders.findAll({
      include: [{ model: Buyers }, { model: Items }],
      where: { ref: ref_no },
    });

    if (result.length === 0) {
      res.status(400).json({
        error: 1,
        msg: 'Order does not exist!',
        data: result,
      });
    } else {
      res.status(200).json({
        error: 0,
        msg: 'Available order items!',
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
 * Function to view orders by status, (buyerID or ref no)
 * @param {*} req
 * @param {*} res
 */
exports.viewOrdersByCriteriaForAdmin = async (req, res) => {
  const { status, buyer_id, ref_no } = req.query;
  const statusWhere = status === undefined ? null : { status };
  const buyerWhere = buyer_id === undefined ? null : { buyer_id };
  const refWhere = ref_no === undefined ? null : { ref: ref_no };

  try {
    const result = await Orders.findAll({
      include: [{ model: Buyers }],
      where: { ...buyerWhere, ...refWhere, ...statusWhere },
    });

    if (result.length === 0) {
      res.status(400).json({
        error: 1,
        msg: 'Order does not exist!',
        data: result,
      });
    } else {
      res.status(200).json({
        error: 0,
        msg: 'Available order items!',
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
