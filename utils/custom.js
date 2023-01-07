const otpGenerator = require('otp-generator');

/**
 * random value generation
 * @param {*} value
 * @returns
 */
exports.randomVal = (value) => {
  return otpGenerator.generate(value, {
    digits: true,
    upperCaseAlphabets: false,
    specialChars: false,
  });
};
