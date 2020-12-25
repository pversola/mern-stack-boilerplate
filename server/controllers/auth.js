const axios = require('axios');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');

const { smtp, send } = require('./mailer');
const crypto = require('./crypto');
const User = require('../models/user');

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  const userExists = User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email is taken'
      });
    }

    const options = crypto.initialKey(
      'aes-192-cbc',
      process.env.JWT_ACCOUNT_ACTIVATION
    );

    if (!options) {
      return res.status(400).json({
        error: 'initial key is worng.'
      });
    }

    crypto
      .cipher(password, options)
      .then((value) => {
        const passwordEnc = value;

        const token = jwt.sign(
          { name, email, passwordEnc },
          process.env.JWT_ACCOUNT_ACTIVATION,
          { expiresIn: process.env.JWT_ACCOUNT_EXPIRE }
        );

        console.log(token.replace(/\./g, '/'));

        const emailData = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: `Account activation link`,
          html: `
                    <h1>Please use the following link to activate your account</h1>
                    <p>${process.env.CLIENT_URL}/auth/activate/${token.replace(
            /\./g,
            '/'
          )}</p>
                    <hr />
                    <p>This email may contain sensetive information</p>
                    <p>${process.env.CLIENT_URL}</p>
                `
        };

        send(smtp, emailData)
          .then((info) => {
            return res.json({
              message: `Email has been sent to ${email}. Follow the instruction to activate your account`
            });
          })
          .catch((err) => {
            return res.status(400).json({
              error: err.message
            });
          });
      })
      .catch((err) => {
        return res.status(400).json({
          error: err.message
        });
      });
  });
};

exports.activation = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (err) {
      if (err) {
        console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err);
        return res.status(401).json({
          error: 'Expired link. Signup again'
        });
      }

      const { name, email, passwordEnc } = jwt.decode(token);

      const options = crypto.initialKey(
        'aes-192-cbc',
        process.env.JWT_ACCOUNT_ACTIVATION
      );
      const password = crypto.decipher(passwordEnc, options);

      crypto
        .decipher(passwordEnc, options)
        .then((value) => {
          const password = value;
          console.log(password);

          const user = new User({
            name,
            email,
            password
          });

          user.save((err, user) => {
            if (err) {
              return res.status(401).json({
                error: 'Error saving user in database, Try signup agin.'
              });
            }

            res.json({
              message: 'Signup success. Please signin.'
            });
          });
        })
        .catch((err) => {
          return res.status(400).json({
            error: err.message
          });
        });
    });
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'Invalid Email or password'
      });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Invalid Email or password'
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE
    });

    user.hashed_password = undefined;
    user.salt = undefined;

    return res.json({
      token,
      user
    });
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['sha1', 'RS256', 'HS256'],
  userProperty: 'auth'
});

exports.adminMiddleware = (req, res, next) => {
  User.findById({ _id: req.auth._id }).exec((err, user) => {
    if (err || !user) {
      res.status(400).json({
        error: 'User not found'
      });
    }

    if (user.role !== 'admin') {
      return res.status(400).json({
        error: 'Admin resource. access denied.'
      });
    }

    req.profile = user;
    next();
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist'
      });
    }
    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_RESET_PASSWORD,
      { expiresIn: process.env.JWT_RESET_EXPIRE }
    );

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.status(400).json({
          error: 'Database connection error on user password forgot request'
        });
      }

      const emailData = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: `Passwort reset link`,
        html: `
                  <h1>Please use the following link to reset your password</h1>
                  <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
                  <hr />
                  <p>This email may contain sensetive information</p>
                  <p>${process.env.CLIENT_URL}</p>
              `
      };

      send(smtp, emailData)
        .then((info) => {
          console.log(info);

          return res.json({
            message: `Email has been sent to ${email}. Follow the instruction to reset your account`
          });
        })
        .catch((err) => {
          console.log(err);

          return res.status(400).json({
            error: err.message
          });
        });
    });
  });
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      function (err, decoded) {
        if (err) {
          return res.status(400).json({
            error: 'Expired link. Try again'
          });
        }

        User.findOne({ resetPasswordLink }, (err, user) => {
          if (err || !user) {
            return res.status(400).json({
              error: 'Something went worng. Try later'
            });
          }

          const updateFields = {
            password: newPassword,
            resetPasswordLink: ''
          };

          user = _.extend(user, updateFields);
          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: 'Error resetting user password'
              });
            }

            res.json({
              message: `Great! Now you can login with your new password`
            });
          });
        });
      }
    );
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
exports.googleLogin = (req, res) => {
  const { idToken } = req.body;

  client
    .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
    .then((response) => {
      console.log('GOOGLE LOGIN RESPONSE', response);
      const { email_verified, name, email } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (user) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRE
            });
            const { _id, email, namme, role } = user;
            return res.json({
              token,
              user: { _id, email, name, role }
            });
          } else {
            let password = email + process.env.JWT_SECRET;

            user = new User({ name, email, password });
            user.save((err, data) => {
              if (err) {
                console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
                return res.status(400).json({
                  error: 'User signup failed with google'
                });
              }

              const token = jwt.sign(
                { _id: data._id },
                process.env.JWT_SECRET,
                { expiresIn: '7d' }
              );
              const { _id, email, namme, role } = data;
              return res.json({
                token,
                user: { _id, email, name, role }
              });
            });
          }
        });
      } else {
        return res.status(400).json({
          error: 'Google login failed. Try again'
        });
      }
    });
};

exports.facebookLogin = (req, res) => {
  const { userID, accessToken } = req.body;

  return axios(url, {
    method: 'GET',
    url: `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`
  })
    .then((response) => response.json())
    .then((response) => {
      const { email, name } = response;
      User.findOne({ email }).exec((err, user) => {
        if (user) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
          });
          const { _id, name, email, role } = user;
          return res.json({
            token,
            user: { _id, email, name, role }
          });
        } else {
          let password = email + process.env.JWT_SECRET;
          user = new User({ name, email, password });
          user.save((err, data) => {
            if (err) {
              return res.status(400).json({
                error: 'User signup failed with facebook'
              });
            }

            const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRE
            });
            const { _id, email, namme, role } = data;

            return res.json({
              token,
              user: { _id, email, name, role }
            });
          });
        }
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: 'Facebook login failed,. Try later'
      });
    });
};
