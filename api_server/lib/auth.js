'use strict';

let passport = require('passport');
let BasicStrategy = require('passport-http').BasicStrategy;
let User = require('../models/user');

passport.use('basic', new BasicStrategy({}, function (email, password, callback) {
  User.findOne({ 'basic.email': email }, function (err, user) {
    console.log('in auth.js');
    if (err) return callback(err);
    console.log(user);
    // No user found with that email
    if (!user) return callback(null, false);

    // Make sure the password is correct
    user.verifyPassword(password, function (err, isMatch) {
      if (err) return callback(err);
      console.log('in verifyPassword');
      console.log(isMatch);
      // Password did not match
      if (!isMatch) return callback(null, false);

      // Success
      return callback(null, user);
    });
  });
}));

exports.isAuthenticated = passport.authenticate('basic', { session: false });
