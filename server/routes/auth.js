const express = require('express');

const router = express.Router();

const {
  signup,
  signin,
  activation,
  forgotPassword,
  resetPassword,
  googleLogin,
  facebookLogin
} = require('../controllers/auth');

const {
  signupValidator,
  signinValidator,
  forgotPasswordValidator,
  resetPasswordvalidator
} = require('../validators/auth');

const { runValidation } = require('../validators');

router.post('/signup', signupValidator, runValidation, signup);
router.post('/signin', signinValidator, runValidation, signin);
router.post('/account-activation', activation);

router.put(
  '/forgot-password',
  forgotPasswordValidator,
  runValidation,
  forgotPassword
);
router.put(
  '/reset-password',
  resetPasswordvalidator,
  runValidation,
  resetPassword
);

router.post('/google-login', googleLogin);
router.post('/facebook-login', facebookLogin);

module.exports = router;
