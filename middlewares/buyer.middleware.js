const Joi = require('joi');
const AuthService = require('../utils/authNetworkService');

const { PRODUCT_CODE_CORE } = require('../config/sysConfig');

const schema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  // name: Joi.not().required(),
  role: Joi.string().required(),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  user: Joi.string().required(),
  password: Joi.string().required(),
});

const ForgotPasswordSchema = Joi.object({
  user: Joi.string().required(),
});

exports.isInputValidated = async (req, res, next) => {
  // try {
  const result = schema.validate(req.body);
  // console.log(result)
  if ('error' in result) {
    res.status(400).json({
      error: 1,
      data: result,
      msg: 'Validation error(s)',
    });
  } else {
    next();
  }
  // } catch (error) {
  //     res.status(400).json({
  //         error: 1,
  //         data: result,
  //         msg: "Validation error(s)"
  //     });
  // }
};

exports.isLoginInputValidated = async (req, res, next) => {
  // try {
  const result = loginSchema.validate(req.body);
  // console.log(result)
  if ('error' in result) {
    res.status(400).json({
      error: 1,
      data: result,
      msg: 'Validation error(s)',
    });
  } else {
    next();
  }
};

exports.isForgotPasswordInputValidated = async (req, res, next) => {
  // try {
  const result = ForgotPasswordSchema.validate(req.body);
  // console.log(result)
  if ('error' in result) {
    res.status(400).json({
      error: 1,
      data: result,
      msg: 'Validation error(s)',
    });
  } else {
    next();
  }
};

exports.isTokenProvided = async (req, res, next) => {
  // try {
  const bearerHeader = req.headers['authorization'];

  try {
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];

      req.token = bearerToken;
      next();
    } else {
      res.status(400).json({
        error: 1,
        msg: 'Authorization is required!',
      });
    }
  } catch (error) {
    res.status(400).json({
      error: 1,
      data: result,
      msg: 'Validation error(s)',
    });
  }
};

/**
 * verify account
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.authenticate = async (req, res, next) => {
  const { token } = req;

  try {
    const authResponse = await AuthService.authenticate(
      token,
      PRODUCT_CODE_CORE
    );

    if (authResponse.error === 1) {
      res.status(400).json(authResponse);
    } else {
      req._data = {
        ...authResponse.data,
      };
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: 1,
      msg: error,
    });
  }
};
