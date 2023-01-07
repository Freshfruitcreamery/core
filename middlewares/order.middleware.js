const Joi = require('joi');

const schema = Joi.object({
  delivery_fee: Joi.number(),
  payment_gateway: Joi.string(),
  address: Joi.string(),
  discount: Joi.number(),
  delivery_mode: Joi.string(),
  reference: Joi.string(),
  orders: Joi.array().required(),
});

const confirmOrderSchema = Joi.object({
  ref_no: Joi.string().required(),
  payment_gateway: Joi.string().required(),
  address: Joi.string().required(),
  delivery_mode: Joi.string().required(),
});

const schemaForAdmin = Joi.object({
  buyer_id: Joi.string().required(),
  orders: Joi.array().required(),
});

/**
 * Validate schema
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
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
};

/**
 * Validate confirm order schema
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.isConfirmOrderInputValidated = async (req, res, next) => {
  // try {
  const result = confirmOrderSchema.validate(req.body);
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

/**
 * Validate schema for admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.isInputValidatedForAdmin = async (req, res, next) => {
  // try {
  const result = schemaForAdmin.validate(req.body);
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
