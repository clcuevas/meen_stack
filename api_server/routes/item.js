'use strict';

// Load required packages
let Item = require('../models/item');

// CREATE ENDPOINTS
// ==============================================

// Create /api/items endpoint
exports.postItem = (req, res) => {
  // POST a new food item
  let item = new Item();

  item.author = req.body.item.author;
  item.food = req.body.item.food;

  // save the new item and check for errors
  item.save((e) => {
    if (e) { res.send(e); }

    res.json({ item: item });
  });
};

exports.getItems = (req, res) => {
  Item.find((e, items) => {
    if (e) { res.send({ error: e }); }

    res.json({ items: items });
  });
};

// Create /api/items/:id endpoint
exports.getItem = (req, res) => {
  Item.findById(req.params.id, (e, item) => {
    if (e) { res.send(e); }

    res.json({ item: item });
  });
};

exports.putItem = (req, res) => {
  Item.findById(req.params.id, (e, item) => {
    if (e) { res.send(e); }

    item.author = req.body.author;
    item.food = req.body.food;

    // save the changes
    item.save((e) => {
      if (e) { res.send(e); }

      res.json({ item: item });
    });
  });
};

exports.deleteItem = (req, res) => {
  Item.remove({
    _id: req.params.id
  }, (e, item) => {
    if (e) { res.send(e); }

    res.json({});
  });
};
