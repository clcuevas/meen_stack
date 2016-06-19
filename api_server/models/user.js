'use strict';

let mongoose = require('mongoose');
let bcrypt = require('bcrypt-nodejs');

let UserSchema = mongoose.Schema({
  username: { type: String, unique: true },
  basic: {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  }
});

// Execute before each user.save() call
UserSchema.pre('save', function (callback) {
  let user = this;

  // Break out if the password hasn't changed
  // =======================================================
  // TODO: Figure out why isModified is not being recognized
  // as a function.
  // =======================================================
  // if (!user.isModified('password')) { return callback(); }

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function (err, salt) {
    if (err) return callback(err);

    bcrypt.hash(user.basic.password, salt, null, function (err, hash) {
      if (err) return callback(err);

      user.basic.password = hash;
      callback();
    });
  });
});

UserSchema.methods.verifyPassword = function (password, callback) {
  bcrypt.compare(password, this.basic.password, function (err, isMatch) {
    if (err) return callback(err);

    callback(null, isMatch);
  });
};

// Export the model
module.exports = mongoose.model('User', UserSchema);
