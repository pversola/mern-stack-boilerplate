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
