'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ItemSchema = new Schema({
  author: String,
  food: String
});

module.exports = mongoose.model('Item', ItemSchema);
