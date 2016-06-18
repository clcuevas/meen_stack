'use strict';
// BASE SETUP
// ===============================================

// Call the packages that are needed
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let mongoose = require('mongoose');
mongoose.connect('mongodb://ember:soccer15@ds031183.mlab.com:31183/freezr_dev');

let Item = require('./models/item');

// Configure the app to use the below headers/ access
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

// Configure the app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8080;

// ROUTES FOR THE API
// ===============================================
let router = express.Router();

// For routes that end with /items
// -----------------------------------------------
router.route('/items')
  // POST a new food item
  .post((req, res) => {
    let item = new Item();

    item.author = req.body.item.author;
    item.food = req.body.item.food;

    // save the new item and check for errors
    item.save((e) => {
      if (e) { res.send(e); }

      res.json({ item: item });
    });
  })
  // GET all food items
  .get((req, res) => {

    Item.find((e, items) => {
      if (e) { res.send({ error: e }); }

      res.json({ items: items });
    });
  });

// For routes that end with /items/:id
// -------------------------------------------------
router.route('/items/:id')
  // GET a single food item
  .get((req, res) => {
    Item.findById(req.params.id, (e, item) => {
      if (e) { res.send(e); }

      res.json({ item: item });
    });
  })
  // Update (i.e. PUT) a food item
  .put((req, res) => {
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
  })
  // DELETE a food item
  .delete((req, res) => {
    Item.remove({
      _id: req.params.id
    }, (e, item) => {
      if (e) { res.send(e); }

      res.json({});
    });
  });

// Add more API route methods here

// REGISTER ROUTES
// ================================================
app.use('/api', router);

// START THE SERVER
// ================================================
app.listen(port);
console.log('Server running on PORT ' + port);
