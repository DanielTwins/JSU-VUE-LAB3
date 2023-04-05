// controller functions for mongodb

const db = require("../models");
const User = db.user;

// Create and Save a new Quiz to a specific user. User Id should be parameter provided.
exports.findUser = async(req, res) => {
    const id = req.params.id;
    const _user = await User.findById(id)
        .then(data => {
            if (!data) { 
                res.status(404).send({ message: `User with id: ${id} could not be found`}); 
            } else { return data; }
            })
        .catch(err => {
            res.status(500).send({ message: `Error retrieving user with id: ${id}` });
        });    
    console.log(`Found user: ${_user}`);
    res.status(200).send(_user);
};
// Create a new quiz and embed
exports.createQuiz = async(req, res) => {
    const id = req.params.id;
    const _user = await User.findById(id)
        .then(data => {
            if (!data) { 
                res.status(404).send({ message: `User with id: ${id} could not be found`}); 
            } else { return data; }
            })
        .catch(err => {
            res.status(500).send({ message: `Error retrieving user with id: ${id}` });
        });    
    _user.created.quiz.push(req.body);
    res.status(200).send(await _user.save());
};
// Create a new user
exports.createUser = (req, res) => {
    console.log("user request recieved!");
    const _user = new User({
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
                err.message || "Some error occurred while creating the user."
            })
        });
};


// Find a single users id with username or email
exports.findUserID = (req, res) => {
  
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