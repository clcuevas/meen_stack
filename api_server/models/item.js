'use strict';

let mongoose = require('mongoose');

let ItemSchema = mongoose.Schema({
  author: String,
  food: String
});

module.exports = mongoose.model('Item', ItemSchema);
