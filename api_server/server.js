'use strict';
// BASE SETUP
// ===============================================
//this will be configured in heroku
process.env.APP_SECRET = process.env.APP_SECRET || 'changethis';

// Call the packages that are needed
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let passport = require('passport');

let auth = require('./lib/auth');

let itemRoutes = require('./routes/item');
let userRoutes = require('./routes/user');

let mongoose = require('mongoose');
mongoose.connect('mongodb://ember:soccer15@ds031183.mlab.com:31183/freezr_dev');

// Configure the app to use the below headers/ access
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

// Configure the app to use bodyParser()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Use the passport package in the app
app.use(passport.initialize());

let port = process.env.PORT || 8080;

// ROUTES FOR THE API
// ===============================================
let router = express.Router();

// For routes that end with /items
// -----------------------------------------------
router.route('/items')
  .post(auth.isAuthenticated, itemRoutes.postItem)
  .get(auth.isAuthenticated, itemRoutes.getItems);

// For routes that end with /items/:id
// -----------------------------------------------
router.route('/items/:id')
  .get(auth.isAuthenticated, itemRoutes.getItem)
  .put(auth.isAuthenticated, itemRoutes.putItem)
  .delete(auth.isAuthenticated, itemRoutes.deleteItem);

// For routes that end with /users
// -----------------------------------------------
router.route('/users')
  .post(userRoutes.postUser)
  .get(auth.isAuthenticated, userRoutes.getUsers);

router.route('/signin')
  .post(auth.isAuthenticated, userRoutes.loginUser);

// REGISTER ROUTES
// ================================================
app.use('/api', router);

// START THE SERVER
// ================================================
app.listen(port);
console.log('Server running on PORT ' + port);
