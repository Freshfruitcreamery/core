const Joi = require('joi');

const schema = Joi.object({
  item_id: Joi.string(),
  buyer_id: Joi.string(),
  type: Joi.string(),
  collection_id: Joi.string(),
  parent_variety: Joi.string(),
  qty: Joi.number(),
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
