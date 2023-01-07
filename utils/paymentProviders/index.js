const paystack = require('./paystack');
const flutterwave = require('./flutterwave');

module.exports = (payment_type) => {
  if (payment_type === 'paystack') {
    return paystack;
  } else if (payment_type === 'flutterwave') {
    return flutterwave;
  }
};
