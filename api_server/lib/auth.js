'use strict';

let passport = require('passport');
let BasicStrategy = require('passport-http').BasicStrategy;
let User = require('../models/user');

passport.use('basic', new BasicStrategy({}, function (email, password, callback) {
  User.findOne({ 'email': email }, function (err, user) {
    if (err) return callback(err);

    // No user found with that email
    if (!user) return callback(null, false);

    // Make sure the password is correct
    user.verifyPassword(password, function (err, isMatch) {
      if (err) return callback(err);
      console.log(password);
      console.log(isMatch);
      console.log(callback);
      // Password did not match
      if (!isMatch) return callback(null, false);

      // Success
      return callback(null, user);
    });
  });
}));

exports.isAuthenticated = passport.authenticate('basic', { session: false });
