const express = require('express');
const router = express.Router();

// Import buyer controller
const buyersCtrl = require('../../controllers/buyers.controller');
// Import buyer middleware
const buyersMiddleware = require('../../middlewares/buyer.middleware');

// Import category routes
const categoryRoutes = require('./category');

// Import item routes
const itemRoutes = require('./item');

// Import blog routes
const blogRoutes = require('./blog');

// Import collection routes
const collectionRoutes = require('./collection');

// Import address routes
const addressRoutes = require('./address');

// Import comment routes
const commentRoutes = require('./comment');

// Import order routes
const orderRoutes = require('./order');

// Import categories collection routes
const categoriesCollectionRoutes = require('./categories_collection');

// Import delivery distance routes
const deliveryDistanceRoutes = require('./delivery_distance');

// signup buyer
router.post(
  '/signup',
  [buyersMiddleware.isInputValidated],
  buyersCtrl.createBuyer
);

// verify account upon signup
router.get(
  '/verify/account/mail',
  buyersMiddleware.isTokenProvided,
  buyersCtrl.verifyAccountMail
);

// signin buyer
router.post(
  '/login',
  buyersMiddleware.isLoginInputValidated,
  buyersCtrl.loginBuyer
);

// initiate reset password for buyer
router.post(
  '/forgot',
  buyersMiddleware.isForgotPasswordInputValidated,
  buyersCtrl.forgotPassword
);

// verify password reset
router.get(
  '/verify/reset',
  buyersMiddleware.isTokenProvided,
  buyersCtrl.verifyResetPassword
);

// reset password
router.post(
  '/reset',
  buyersMiddleware.isTokenProvided,
  buyersCtrl.resetPassword
);

// reset password
router.post(
  '/reset/pass',
  buyersMiddleware.isTokenProvided,
  buyersCtrl.resetPasswordAuth
);

// update profile
router.post(
  '/profile',
  buyersMiddleware.isTokenProvided,
  buyersCtrl.updateBuyer
);

// view account
router.get(
  '/account/profile',
  buyersMiddleware.isTokenProvided,
  buyersCtrl.viewAccount
);

// category routes
router.use('/category', categoryRoutes);

// item routes
router.use('/item', itemRoutes);

// collection routes
router.use('/collection', collectionRoutes);

// blog routes
router.use('/blog', blogRoutes);

// address routes
router.use(
  '/address',
  [buyersMiddleware.isTokenProvided, buyersMiddleware.authenticate],
  addressRoutes
);

// comment routes
router.use(
  '/comment',
  [buyersMiddleware.isTokenProvided, buyersMiddleware.authenticate],
  commentRoutes
);

// order routes
router.use(
  '/order',
  [buyersMiddleware.isTokenProvided, buyersMiddleware.authenticate],
  orderRoutes
);

// Categories collection routes
router.use('/categories-collection', categoriesCollectionRoutes);

// Delivery distance routes
router.use('/delivery-distance', deliveryDistanceRoutes);

module.exports = router;
