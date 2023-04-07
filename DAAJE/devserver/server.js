// BASE SERVER SETUP
// =============================================================================

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/routes');

// all static served content declared here

app.use(express.static('public'));

//  Allow for CORS. Use cors() as middleware to allow for cors on single routes.
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// parsing for middleware functions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use router for all routes from base path
app.use('/', router);

// MongoDB database
const db = require("./models");

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
// <===== Export the ready server =====>

module.exports = app;
