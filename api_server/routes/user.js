'use strict';

// Load required packages
let User = require('../models/user');

// CREATE ENDPOINTS
// ==============================================

// Create /api/users endpoint for POST
exports.postUser = function (req, res) {
  let newUserData = JSON.parse(JSON.stringify(req.body));

  let user = new User({
    username: newUserData.username,
    'basic.email': newUserData.email,
    'basic.password': newUserData.password
  });

  user.save(function (err) {
    if (err) res.send(err);

    res.json({ user: user });
  });
};

// Create /api/users endpoint for GET
exports.getUsers = function (req, res) {
  User.find(function (err, users) {
    if (err) res.send(err);

    res.json({ users: users });
  });
};

exports.loginUser = function (req, res) {
  req.user.generateToken(process.env.APP_SECRET, function(err, token) {
    if (err) return res.status(500).json({msg: 'error generating token'});

    res.json({msg: 'authenticated as: ' + req.user.basic.email, username: req.user.username, token: token});
  });//end generateToken
};
