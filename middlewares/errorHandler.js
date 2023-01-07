const CustomError = require('../utils/customError');
// const logger = require('../utils/logger')
const config = require('../config/sysConfig');

module.exports = (err, req, res) => {
  if (err instanceof CustomError) {
    return res.status(err.status).json({ error: 1, msg: err.message });
  }
  let resObj = {};

  if (process.env.NODE_ENV === 'production') {
    console.log('its production');
    // logger.error(err)
    resObj = {
      error: 1,
      msg: 'Something went wrong. Try again later.',
    };
  } else {
    console.log(err.name, err.message);
    resObj = {
      error: 1,
      msg: err.message,
      data: err.stack,
    };
  }

  return res.status(500).json(resObj);
  // return process.exit(1)
};
