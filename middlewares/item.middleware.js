const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  image1: Joi.string().required(),
  cat_id: Joi.string().required(),
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
