const Transactions = require('../models').transactions;
const Orders = require('../models').orders;
const Buyers = require('../models').buyers;
const Item = require('../models').items;

const { Op, Transaction } = require('sequelize');
const otpGenerator = require('otp-generator');

const { APP_PREFIX } = require('../config/sysConfig');
const { randomVal } = require('../utils/custom');
const getPaymentProvider = require('../utils/paymentProviders/index');
const {
  BuyersNewOrderMailer,
  AdminNewOrderMailer,
  BuyersUpdateOrderMailer,
  AdminUpdateOrderMailer,
} = require('../utils/mailer/samples');

const { assignedAdmin, buyer } = require('../config/sysConfig');

/**
 * Create an order
 * @param {*} data
 * @param {*} user
 * @returns
 */
exports.createAnOrder = async (data = [], user = {}) => {
  const {
    reference,
    delivery_fee,
    payment_gateway,
    address,
    discount,
    delivery_mode,
  } = data;
  const ref =
    reference === undefined ? APP_PREFIX + '-' + randomVal(10) : reference;
  const buyer_id = user.id;

  //   Check for duplicates
  if (duplicateOrderItems(data.orders)) {
    await Promise.reject('Order has duplicate items!');
  }
  //   Create order items
  const result = await Promise.all(
    data.orders.map((order) => addNewOrder(order, ref, buyer_id))
  );

  //   Create transaction
  const trans_result = await Transactions.create({
    ref,
    buyer_id,
    amount: result.reduce((pr, cur) => pr + cur.amount, 0),
    delivery_fee,
    payment_gateway,
    address,
    discount,
    delivery_mode,
    status: 'paid',
  });

  const orders = await Orders.findAll({
    include: [{ model: Item }],
    where: { ref },
  });

  const trx = await Transactions.findOne({
    include: [{ model: Buyers }],
    where: { ref },
  });

  const MailerResponse = await BuyersNewOrderMailer(user, orders, ref);
  const MailerResponse2 = await AdminNewOrderMailer(assignedAdmin, orders, trx);

  return {
    ref,
    amount: trans_result.amount,
    orders: result,
  };
};

/**
 * confirm an order
 * @param {*} data
 * @param {*} user
 * @returns
 */
exports.confirmOrder = async (data = {}, user = {}) => {
  const { ref_no, payment_gateway, address, delivery_mode } = data;

  const savedTrx = await Transactions.findOne({ where: { ref: ref_no } });
  if (savedTrx === null) await Promise.reject('Invalid Reference number!');
  if (savedTrx.status == 'paid' || savedTrx.status == 'fulfilled')
    await Promise.reject('Order has passed stage of confirmation!');

  try {
    await confirmPayment(savedTrx, data);

    // Update each order items and Notify the vendors
    await Orders.update({ status: 'ordered' }, { where: { ref: ref_no } });
    //    vendorNotification.order.alertStatusChange()

    const transaction = {
      payment_gateway,
      delivery_mode,
      address,
      status: 'paid',
    };
    await Transactions.update(transaction, { where: { ref: ref_no } });

    return true;
  } catch (error) {
    await Transactions.update(
      { delivery_mode, address, payment_gateway, status: 'failed' },
      { where: { ref: ref_no } }
    );
    await Promise.reject(error);
  }
};

/**
 * update an order items
 * @param {*} data
 * @param {*} ref_no
 * @returns
 */
exports.updateOrderItems = async (data = {}, id) => {
  const { status } = data;

  const savedOrderItems = await Orders.findAll({ where: { id } });
  if (savedOrderItems.length === 0)
    await Promise.reject('Order items with this ref no does not exist!');

  await Orders.update({ status }, { where: { id } });
  return true;
};

/**
 * update an order
 * @param {{}} data
 * @param {{}} user
 * @param {*} ref_no
 * @returns
 */
exports.updateOrder = async (data = {}, user = {}, ref_no) => {
  const { status } = data;

  let savedTrx = await Transactions.findOne({
    include: [{ model: Buyers }],
    where: { ref: ref_no },
  });
  if (savedTrx === null)
    await Promise.reject('Order with this ref no does not exist!');

  await Transactions.update({ status }, { where: { ref: ref_no } });

  savedTrx = { ...savedTrx.toJSON(), status };
  // Send mails
  const response = await BuyersUpdateOrderMailer(buyer.client, savedTrx);
  const response2 = await AdminUpdateOrderMailer(user, savedTrx);

  return true;
};

/**
 * delete order
 * @param {*} ref_no
 * @returns
 */
exports.deleteOrder = async (ref_no) => {
  const savedTrx = await Transactions.findOne({ where: { ref: ref_no } });
  if (savedTrx.length === 0)
    await Promise.reject('Order with this ref no does not exist!');

  const savedOrderItems = await Orders.findAll({ where: { ref: ref_no } });
  if (savedOrderItems.length === 0)
    await Promise.reject('Order items with this ref no does not exist!');

  await Orders.destroy({ where: { ref: ref_no } });
  await Transactions.destroy({ where: { ref: ref_no } });

  return true;
};

/**
 * Add individual order items
 * @param {*} order
 * @param {*} ref
 * @param {*} buyer_id
 * @returns
 */
const addNewOrder = (order, ref, buyer_id) =>
  new Promise(async (resolve, reject) => {
    const itemResult = await Item.findOne({ where: { id: order.item_id } });

    if (itemResult === null) {
      return reject('Item does not exist!');
    }
    const orderResult = await Orders.findOne({
      where: { item_id: order.item_id, ref },
    });
    if (orderResult !== null) {
      return reject('Order with this item no and ref does not exists!');
    }

    if (order.parent_item !== undefined) {
      const parentItemResult = await Item.findOne({
        where: { id: order.parent_item },
      });
      if (parentItemResult === null) {
        return reject('Parent Item does not exist!');
      }
    }

    const amount = itemResult.price * order.quantity;
    const orderPayload = {
      ...order,
      ref,
      buyer_id,
      amount,
      addition: order.parent_item !== undefined ? 1 : null,
      status: 'ordered',
    };

    const newOrder = await Orders.create(orderPayload);

    return resolve({
      ...newOrder.dataValues,
    });
  });

/**
 * Confirm order payment
 * @param {*} savedTrx
 * @param {*} data
 */
const confirmPayment = async (savedTrx, data) => {
  const trxResponse = await getPaymentProvider(
    data.payment_gateway
  ).verifyPayment(data.ref_no);
  if (trxResponse === null)
    await Promise.reject(
      'Error verifying payment. Please, contact Customer Service.'
    );

  // Confirm the total amount of the order tallies with the amount paid
  if (
    savedTrx.amount > trxResponse.amount ||
    trxResponse.currency.toUpperCase() !== 'NGN'
  ) {
    await Promise.reject('Incomplete payment made!');
  }
};

/**
 * Check for duplicate in order items
 * @param {*} orders
 * @returns
 */
const duplicateOrderItems = (orders) => {
  var valueArr = orders.map((order) => {
    return order.item_id;
  });
  var isDuplicate = valueArr.some((order, idx) => {
    return valueArr.indexOf(order) != idx;
  });
  return isDuplicate;
};
