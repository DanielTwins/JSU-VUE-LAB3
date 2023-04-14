// Index for database handling

const dbConfig      = require("../config/db.config.js");
const mongoose      = require("mongoose");
mongoose.Promise    = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.user = require("./user.model.js")(mongoose); // SYNTAX NOTE << require said module with parameter "mongoose". See relevant file for parameter usage.
db.quiz = require("./quiz.model.js")(mongoose);
db.result = require("./result.model.js")(mongoose);

module.exports = db;