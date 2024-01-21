const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  type: Joi.string(),
  image: Joi.string().required(),
  parent_cat_id: Joi.string(),
  child_cat_id: Joi.optional(),
  sub_child_cat_id: Joi.optional(),
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
