'use strict';

// Load required packages
let Item = require('../models/item');
let User = require('../models/user');

// CREATE ENDPOINTS
// ==============================================

// Create /api/items endpoint
exports.postItem = function (req, res) {
  // POST a new food item
  let item = new Item();

  item.author = req.body.item.author;
  item.food = req.body.item.food;

  // save the new item and check for errors
  item.save(function (e) {
    if (e) { res.send(e); }

    res.json({ item: item });
  });
};

exports.getItems = function (req, res) {
  console.log(req);
  Item.find(function (e, items) {
    if (e) { res.send({ error: e }); }

    res.json({ items: items });
  });
};

// Create /api/items/:id endpoint
exports.getItem = function (req, res) {
  Item.findById(req.params.id, function (e, item) {
    if (e) { res.send(e); }

    res.json({ item: item });
  });
};

exports.putItem = function (req, res) {
  Item.findById(req.params.id, function (e, item) {
    if (e) { res.send(e); }

    item.author = req.body.author;
    item.food = req.body.food;

    // save the changes
    item.save(function (e) {
      if (e) { res.send(e); }

      res.json({ item: item });
    });
  });
};

exports.deleteItem = function (req, res) {
  Item.remove({
    _id: req.params.id
  }, function (e, item) {
    if (e) { res.send(e); }

    res.json({});
  });
};
