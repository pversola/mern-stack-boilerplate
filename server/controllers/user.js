const User = require('../models/user');

exports.list = (req, res) => {
  const userId = req.params.id;

  User.find().exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'User not found'
      });
    }

    user.hashed_password = undefined;
    user.salt = undefined;

    res.json(user);
  });
};

exports.update = (req, res) => {
  const userId = req.auth._id;
  const { name, password } = req.body;

  User.findOne({ _id: userId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }

    if (!name) {
      return res.status(400).json({
        error: 'Name is required'
      });
    } else {
      user.name = name;
    }

    if (password) {
      if (password.lenght < 6) {
        return res.status(400).json({
          error: 'Password should be min 6 chracters long'
        });
      } else {
        user.password = password;
      }
    }

    user.save((err, updatedUser) => {
      if (err) {
        return res.status(400).json({
          error: 'User update failed'
        });
      }

      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;

      res.json(updatedUser);
    });
  });
};

exports.remove = (req, res) => {
  const userId = req.auth._id;
  User.remove({ _id: userId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found'
      });
    }
  });
};
