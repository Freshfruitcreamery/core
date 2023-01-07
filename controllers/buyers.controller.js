const Buyers = require('../models').buyers;
const Products = require('../models').products;
const Roles = require('../models').roles;

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const otpGenerator = require('otp-generator');

const AuthService = require('../utils/authNetworkService');
const config = require('../config/sysConfig');

const saltRounds = 10;
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

/**
 * Function for creating a Buyer
 * @param {*} req
 * @param {*} res
 */
exports.createBuyer = async (req, res) => {
  let { first_name, last_name, name, email, phone, role, password } = req.body;
  const { scope } = req.query;
  try {
    const authResponse = await AuthService.createUser({
      ...req.body,
      role,
      scope,
      product_code: config.PRODUCT_CODE_CORE,
      client: config.buyer.key,
    });
    console.log(authResponse);

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      let response = await Buyers.create({
        first_name,
        last_name,
        name,
        email,
        phone,
      });
      res.json(authResponse);
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
 * Function for verifying account upon signup through email
 * @param {*} req
 * @param {*} res
 */
exports.verifyAccountMail = async (req, res) => {
  const { token } = req;
  try {
    const authResponse = await AuthService.verifyAccount(token);

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      res.json(authResponse);
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
 * Function to signin a buyer
 * @param {*} req
 * @param {*} res
 */
exports.loginBuyer = async (req, res) => {
  const { user, password } = req.body;
  try {
    const authResponse = await AuthService.login({
      user,
      password,
      product_code: config.PRODUCT_CODE_CORE,
    });

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      res.json(authResponse);
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
 * View profile account
 * @param {*} req
 * @param {*} res
 */
exports.viewAccount = async (req, res) => {
  const { id } = req.params;
  const { token } = req;

  const response = await AuthService.authenticate(
    token,
    config.PRODUCT_CODE_CORE
  );
  if (response.error === 1) {
    return res.json(response);
  } else {
    const { email } = response.data;
    const buyerDetails = await Buyers.findOne(
      { where: { email } },
      {
        attributes: [
          'gender',
          'country',
          'state',
          'address',
          'zipcode',
          'image',
          'about',
        ],
      }
    );
    return res.json({
      error: 0,
      data: { ...response.data, ...buyerDetails.toJSON() },
    });
  }
};

/**
 * Function to initiate a reset password through email
 * @param {*} req
 * @param {*} res
 */
exports.forgotPassword = async (req, res) => {
  let { user } = req.body;
  try {
    const authResponse = await AuthService.forgotPassword({
      user,
      product_code: config.PRODUCT_CODE_CORE,
    });

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      res.json(authResponse);
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
 * Function to verify password reset
 * @param {*} req
 * @param {*} res
 */
exports.verifyResetPassword = async (req, res) => {
  const { token } = req;
  try {
    const authResponse = await AuthService.verifyPasswordToken(token);

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      res.json(authResponse);
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
 * Function to reset password
 * @param {*} req
 * @param {*} res
 */
exports.resetPassword = async (req, res) => {
  const { password, password_confirmation } = req.body;
  const { token } = req;
  try {
    const authResponse = await AuthService.resetPassword(token, {
      password,
      password_confirmation,
      product_code: config.PRODUCT_CODE_CORE,
    });

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      res.json(authResponse);
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
 * Function to reset password [authorized]
 * @param {*} req
 * @param {*} res
 */
exports.resetPasswordAuth = async (req, res) => {
  const { password, password_confirmation } = req.body;
  const { token } = req;
  try {
    const authResponse = await AuthService.resetPasswordAuth(token, {
      password,
      password_confirmation,
      product_code: config.PRODUCT_CODE_CORE,
    });

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      res.json(authResponse);
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
 * Function to update a Buyer
 * @param {*} req
 * @param {*} res
 */
exports.updateBuyer = async (req, res) => {
  const { token } = req;

  try {
    const authResponse = await AuthService.updateAccount(token, {
      ...req.body,
      product_code: config.PRODUCT_CODE_CORE,
    });

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      // Update Buyer
      const response = await Buyers.update(req.body, {
        where: {
          [Op.or]: [
            { email: authResponse.data.email },
            { phone: authResponse.data.phone },
          ],
        },
      });
      res.status(200).json({
        error: authResponse.error,
        msg: authResponse.msg,
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
