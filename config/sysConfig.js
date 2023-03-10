module.exports = {
  APP_NAME: '',
  APP_DESCRIPTION: '',
  APP_LOGO: '',

  APP_PREFIX: 'FRC',

  HTTP_TIMEOUT: 5000,

  FLUTTERWAVE_SERVICE_URL: '',
  FLUTTERWAVE_SECRET_KEY: '',

  PAYSTACK_SERVICE_URL: 'https://api.paystack.co',
  PAYSTACK_SECRET_KEY: 'sk_test_dc21b4fb3e0b77c70a34d038a71c7538693fcf0f',
  PAYSTACK_PUBLIC_KEY: 'pk_test_a6bcb4a86877a435d650c4bc6699ab9b83bfa2d2',

  // AUTH_SERVICE_URL: 'https://auth-freshfruitcreamy.herokuapp.com',
  // CORE_SERVICE_URL: 'https://core-freshfruitcreamery.herokuapp.com',
  AUTH_SERVICE_URL: 'http://localhost:4005',
  CORE_SERVICE_URL: 'http://localhost:4007',
  PRODUCT_CODE_CORE: 'FFC',
  PRODUCT_CODE_MAIN: 'FFM',
  ENTITY_CODE_LENGTH: 5,
  MAXIMUM_NUMBER_OF_IMAGES_TO_UPLOAD: 5,
  VALID_IMAGE_FORMATS: ['jpg', 'jpeg', 'png', 'PNG', 'pdf'],
  MAX_UPLOAD_IMAGE_SIZE: 50 * 1024 * 1024, // Bytes
  // User Types and their roles with scopes
  buyer: {
    role: 'BUYER',
    key: 'BUYER',
    client: 'http://localhost:3000/',
  },
  admin: {
    role: 'ADMIN',
    key: 'ADMIN',
  },
  assignedAdmin: {
    email: 'olaleyeemmanuel23@gmail.com',
    url: 'http://localhost:3000/',
  },
};
