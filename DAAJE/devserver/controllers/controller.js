// controller functions for mongodb

const db = require("../models");
const user = db.models;

// Create and Save a new Quiz
exports.createQuiz = (req, res) => {
    
};
// Create a new user
exports.createUser = (req, res) => {
    console.log("user request recieved!");
    const _user = new user({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    console.log(_user);
    _user.save(_user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the User."
            })
        });
};

// Retrieve all Quiz from the database.
exports.findAll = (req, res) => {

};

// Find a single Quiz with an id
exports.findOne = (req, res) => {
  
};

// Update a Quiz by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Quiz with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Quizs from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Quizs
exports.findAllPublished = (req, res) => {
  
};