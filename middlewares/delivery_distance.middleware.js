const Joi = require('joi');
const { areaTypes } = require('../utils/types');

const schema = Joi.object({
  // area: Joi.string()
  //   .custom((value, helper) => {
  //     if (!areaTypes.includes(value)) {
  //       return helper.message(
  //         `Area must be one the following: ${areaTypes.join(', ')}`
  //       );
  //     }

  //     return true;
  //   })
  //   .required(),
  distance_from: Joi.number().required(),
  distance_to: Joi.number().required(),
  charge: Joi.number().required(),
  is_public: Joi.boolean().optional(),
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
