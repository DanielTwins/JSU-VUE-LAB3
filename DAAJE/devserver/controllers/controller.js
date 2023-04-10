// controller functions for mongodb

// mongodb
const db = require("../models");
const User = db.user;
const Quiz = db.quiz;
// passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// use definitions
passport.use(
    new LocalStrategy({usernameField: "email"}, async(email, password, done) => {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return done(null, false, { message: "Incorrect e-mail" })
            };
            if (user.password !== password) {
                return done(null, false, { message: "Incorrect password" })
            };
            return done(null, user);
        } catch(err) { 
            return done(err); 
        }
    })
  );
passport.serializeUser((user, done) => {
    console.log("serialize called");
    console.log(user.id);
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    console.log("deserialize called");
    console.log(id);
    try {
        User.findById(id, (err, user) => {
            done(err, user)
        });
    } catch(err) {
        done(err);
    };
});

//**use db.mongoose for generic db methods**

// Functions
// Get all data from a specific user id provided by param
async function findUserQuiz(id) {
    const _user = await User.findById(id)
        .then(data => {
            if (!data) { 
                console.log(`User with id: ${id} could not be found`); 
            } else { return data; }
            })
        .catch(err => {
            console.log(`Error retrieving user with id: ${id}`);
        });    
    return _user.created.quiz;
};
// Create a new quiz and embed
exports.createQuiz = async(req, res) => {
    const id = req.params.id;
    const _user = await User.findById(id)
        .then(data => {
            if (!data) { 
                res.status(404).send({ message: `User with id: ${id} could not be found`}); 
            } else { return data; }})
            .catch(err => {
                res.status(500).send({ message: `Error retrieving user with id: ${id}` });
            }
        );    
    //req.body._id = 
    _user.created.quiz.push(req.body); //vanilla js "push" is used on the provided db object. Consider using mongodb operators directly.
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
    _user.save(_user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
};
// Get all mock quizes
exports.getMockQuestions = async(req, res) => {
    // retrieve all mock quizes
    const quizes = await Quiz.find()
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
    // if a user id parameter is provided in the request; push all custom quizes associated with that user and return the data
    if(req.params.id) {
        const userQuizes = await findUserQuiz(req.params.id);
        for(let i of userQuizes) {
            quizes.push(i);
        }
    }
    res.status(200).send(quizes);
}; 
exports.login = (req, res, next) => {   
    console.log(req.session);
    // fails here. deserialize does not get called
    passport.authenticate("local", function(err, user, info) {
        console.log(user);
        if(err) {
            return res.status(400).send(err);
        }
        if(!user) {
            //issue here
            console.log("here");
            return res.status(400).send({msg: err});
        }
        req.logIn(user, function(err) {
            if(err) { 
                
                return res.status(500).send(err); 
            }
            console.log("success auth for " + req.user);
            return res.status(200).send(user.id);
        });
    })(req, res, next);
};
exports.passport = passport;