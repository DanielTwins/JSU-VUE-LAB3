// BASE SERVER SETUP
// =============================================================================

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/routes');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { passport } = require("./controllers/controller");

// all static served content declared here

app.use(express.static('public'));

// MongoDB database
const db = require("./models");
const { trusted } = require('mongoose');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//  Allow for CORS. Use cors() as middleware to allow for cors on single routes.
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// parsing for middleware functions
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// passport.js
app.use(session({ secret: `${process.env.SESSION_SECRET}`, resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// Use router for all routes from base path
app.use('/', router);

/* <===== Export the ready server =====> */

module.exports = app;
