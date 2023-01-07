const Admins = require('../models').admins;
const Buyers = require('../models').buyers;

const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const otpGenerator = require('otp-generator');

const AuthService = require('../utils/authNetworkService');
const config = require('../config/sysConfig');
const { PRODUCT_CODE_MAIN } = require('../config/sysConfig');

const saltRounds = 10;
const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

/**
 * Function for creating a Admin
 * @param {*} req
 * @param {*} res
 */
exports.createAdmin = async (req, res) => {
  let { first_name, last_name, name, email, role, phone, password } = req.body;
  const { scope } = req.query;
  try {
    const authResponse = await AuthService.createUser({
      ...req.body,
      role,
      scope,
      product_code: config.PRODUCT_CODE_MAIN,
      client: config.admin.key,
    });

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      let response = await Admins.create({
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
 * Function to signin a Admin
 * @param {*} req
 * @param {*} res
 */
exports.loginAdmin = async (req, res) => {
  const { user, password } = req.body;
  try {
    const authResponse = await AuthService.login({
      user,
      password,
      product_code: config.PRODUCT_CODE_MAIN,
    });

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      const admin = await Admins.findOne({
        where: { [Op.or]: [{ email: user }, { phone: user }] },
        attributes: [
          'first_name',
          'last_name',
          'name',
          'email',
          'phone',
          'state',
          'country',
          'about',
          'address',
          'image',
          'gender',
          'zipcode',
        ],
      });

      res.json({
        ...authResponse,
        data: { ...authResponse.data, ...admin },
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
 * Function to initiate a reset password through email
 * @param {*} req
 * @param {*} res
 */
exports.forgotPassword = async (req, res) => {
  let { user } = req.body;
  try {
    const authResponse = await AuthService.forgotPassword({
      user,
      product_code: config.PRODUCT_CODE_MAIN,
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
  let { token } = req;

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
      product_code: config.PRODUCT_CODE_MAIN,
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
 * Function to reset password [authorized user]
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
      product_code: config.PRODUCT_CODE_MAIN,
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
 * Function to get all Admins
 * @param {*} req
 * @param {*} res
 */
exports.getAllAdmins = async (req, res) => {
  try {
    const result = await Admins.findAll();
    res.json({
      error: 0,
      result,
    });
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Function to get a Admin by ID
 * @param {*} req
 * @param {*} res
 */
exports.getAdminByID = async (req, res) => {
  const { id } = req.params;
  try {
    let result = await Admins.findOne({
      where: { id },
    });
    result = result === null ? {} : result;
    res.json({
      error: 0,
      result,
    });
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Function to update an Admin
 * @param {*} req
 * @param {*} res
 */
exports.updateAdmin = async (req, res) => {
  const { token } = req;
  const { scope } = req.query;

  try {
    const authResponse = await AuthService.updateAccount(token, {
      ...req.body,
      scope,
      product_code: config.PRODUCT_CODE_MAIN,
    });

    // console.log(authResponse)
    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      // Update Admin
      const response = await Admins.update(req.body, {
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

/**
 * Function to update an Admin by id
 * @param {*} req
 * @param {*} res
 */
exports.updateAdminByID = async (req, res) => {
  const { token } = req;
  const { scope } = req.query;
  const { id } = req.params;

  try {
    const authResponse = await AuthService.updateAccountByID(
      token,
      {
        ...req.body,
        scope,
        product_code: config.PRODUCT_CODE_MAIN,
      },
      id
    );

    // console.log(authResponse)
    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      // Update Admin
      const response = await Admins.update(req.body, {
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

/**
 * Function to delete a Admin
 * @param {*} req
 * @param {*} res
 */
exports.deleteAdmin = async (req, res) => {
  const { token } = req;
  const { id } = req.params;
  const { scope } = req.query;
  try {
    const authResponse = await AuthService.deleteUser(
      token,
      id,
      scope,
      config.PRODUCT_CODE_MAIN
    );

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      // Delete Admin
      const response = await Admins.destroy({
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
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Function to delete a buyer
 * @param {*} req
 * @param {*} res
 */
exports.deleteBuyer = async (req, res) => {
  const { token } = req;
  const { id } = req.params;
  const { scope } = req.query;
  try {
    const authResponse = await AuthService.deleteUser(
      token,
      id,
      scope,
      config.PRODUCT_CODE_MAIN
    );

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      // Delete Buyer
      const response = await Buyers.destroy({
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
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Function to view admins
 * @param {*} req
 * @param {*} res
 */
exports.viewAdmins = async (req, res) => {
  const { token } = req;
  const { scope } = req.query;

  try {
    const authResponse = await AuthService.getUsers(
      token,
      scope,
      config.PRODUCT_CODE_MAIN, // For checking permissions
      config.PRODUCT_CODE_MAIN // For specifying the kind of user to view through product code
    );

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      res.status(200).json(authResponse);
    }
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Function to view buyers
 * @param {*} req
 * @param {*} res
 */
exports.viewBuyers = async (req, res) => {
  const { token } = req;
  const { scope } = req.query;

  try {
    const authResponse = await AuthService.getUsers(
      token,
      scope,
      config.PRODUCT_CODE_MAIN, //For checking permissions
      config.PRODUCT_CODE_CORE // For specifying the kind of user to view through product code
    );

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      res.status(200).json(authResponse);
    }
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Function to view user
 * @param {*} req
 * @param {*} res
 */
exports.viewAccount = async (req, res) => {
  const { token } = req;
  const { user_id } = req.params;
  const { scope } = req.query;

  try {
    const authResponse = await AuthService.getUser(user_id, scope, token);

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      res.status(200).json(authResponse);
    }
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Function to activate user's account
 * @param {*} req
 * @param {*} res
 */
exports.activateAccount = async (req, res) => {
  const { token } = req;
  const { user_id } = req.params;
  const { scope } = req.query;

  try {
    const authResponse = await AuthService.activateAccount(
      user_id,
      token,
      scope,
      PRODUCT_CODE_MAIN
    );

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      res.status(200).json(authResponse);
    }
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};

/**
 * Function to deactivate user's account
 * @param {*} req
 * @param {*} res
 */
exports.deactivateAccount = async (req, res) => {
  const { token } = req;
  const { user_id } = req.params;
  const { scope } = req.query;

  try {
    const authResponse = await AuthService.deactivateAccount(
      user_id,
      token,
      scope,
      PRODUCT_CODE_MAIN
    );

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      res.status(200).json(authResponse);
    }
  } catch (error) {
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};
