const { check } = require('express-validator');

exports.signupValidator = [
  check('name').not().isEmpty().withMessage('Name is require'),
  check('email').isEmail().withMessage('Must be a valid email address'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 6 characters long')
];

exports.signinValidator = [
  check('email').isEmail().withMessage('Must be a valid email address'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

exports.forgotPasswordValidator = [
  check('email').isEmail().withMessage('Must be a valid email address')
];

exports.resetPasswordvalidator = [
  check('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 6 characters long')
];
