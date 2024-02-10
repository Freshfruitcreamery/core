const express = require('express');
const router = express.Router();

// Import admin controller
const adminsCtrl = require('../../controllers/admins.controller');
const adminsMiddleware = require('../../middlewares/admin.middleware');

// import categories route
const categoriesRoutes = require('./categories');

// import item route
const itemRoutes = require('./item');

// import collection route
const collectionRoutes = require('./collection');

// import variety route
const varietyRoutes = require('./variety');

// import blog route
const blogRoutes = require('./blog');

// import order route
const orderRoutes = require('./order');

// import categories collection route
const categoriesCollectionRoutes = require('./categories_collection');

// signup admin
router.post(
  '/signup',
  [
    adminsMiddleware.isTokenProvided,
    adminsMiddleware.authenticate,
    adminsMiddleware.isInputValidated,
  ],
  adminsCtrl.createAdmin
);

// verify account upon signup
router.get(
  '/verify/account/mail',
  adminsMiddleware.isTokenProvided,
  adminsCtrl.verifyAccountMail
);

// signin admin
router.post(
  '/login',
  adminsMiddleware.isLoginInputValidated,
  adminsCtrl.loginAdmin
);

// initiate reset password for admin
router.post(
  '/forgot',
  adminsMiddleware.isForgotPasswordInputValidated,
  adminsCtrl.forgotPassword
);

// verify password reset
router.get(
  '/verify/reset',
  adminsMiddleware.isTokenProvided,
  adminsCtrl.verifyResetPassword
);

// reset password
router.post(
  '/reset',
  adminsMiddleware.isTokenProvided,
  adminsCtrl.resetPassword
);

// reset password
router.post(
  '/reset/pass',
  adminsMiddleware.isTokenProvided,
  adminsCtrl.resetPasswordAuth
);

// update profile
router.post(
  '/profile',
  adminsMiddleware.isTokenProvided,
  adminsCtrl.updateAdmin
);

// update profile by id
router.put(
  '/profile/:id',
  adminsMiddleware.isTokenProvided,
  adminsCtrl.updateAdminByID
);

// delete admin's account
router.delete(
  '/remove/:id',
  adminsMiddleware.isTokenProvided,
  adminsCtrl.deleteAdmin
);

// delete buyer's account
router.delete(
  '/remove/:id/buyer',
  adminsMiddleware.isTokenProvided,
  adminsCtrl.deleteBuyer
);

// view admins
router.get(
  '/accounts',
  adminsMiddleware.isTokenProvided,
  adminsCtrl.viewAdmins
);

// view buyers
router.get(
  '/accounts/buyers',
  adminsMiddleware.isTokenProvided,
  adminsCtrl.viewBuyers
);

// view buyer/admin
router.get(
  '/account/:user_id',
  adminsMiddleware.isTokenProvided,
  adminsCtrl.viewAccount
);

// activate user
router.get(
  '/activate/account/:user_id',
  adminsMiddleware.isTokenProvided,
  adminsCtrl.activateAccount
);

// activate user
router.get(
  '/deactivate/account/:user_id',
  adminsMiddleware.isTokenProvided,
  adminsCtrl.deactivateAccount
);

// Categories routes
router.use(
  '/category',
  [adminsMiddleware.isTokenProvided, adminsMiddleware.authenticate],
  categoriesRoutes
);

// Item routes
router.use(
  '/item',
  // [adminsMiddleware.isTokenProvided, adminsMiddleware.authenticate],
  itemRoutes
);

// Collection routes
router.use(
  '/collection',
  [adminsMiddleware.isTokenProvided, adminsMiddleware.authenticate],
  collectionRoutes
);

// Variety routes
router.use(
  '/variety',
  [adminsMiddleware.isTokenProvided, adminsMiddleware.authenticate],
  varietyRoutes
);

// Blog routes
router.use(
  '/blog',
  [adminsMiddleware.isTokenProvided, adminsMiddleware.authenticate],
  blogRoutes
);

// Order routes
router.use(
  '/order',
  [adminsMiddleware.isTokenProvided, adminsMiddleware.authenticate],
  orderRoutes
);

// Categories collection routes
router.use(
  '/categories-collection',
  [adminsMiddleware.isTokenProvided, adminsMiddleware.authenticate],
  categoriesCollectionRoutes
);

module.exports = router;
