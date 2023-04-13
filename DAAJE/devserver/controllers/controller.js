// controller functions for mongodb
/* eslint-disable */
// passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// mongodb
const db = require("../models");

const User = db.user;
const Quiz = db.quiz;

// use definitions
passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "Incorrect e-mail" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

//* *use db.mongoose for generic db methods**

// Functions
// Get all data from a specific user id provided by param
async function findUserQuiz(id) {
  const _user = await User.findById(id)
    .then((data) => {
      if (!data) {
        console.log(`User with id: ${id} could not be found`);
      } else { return data; }
    })
    .catch((err) => {
      console.log(`Error retrieving user with id: ${id}`);
    });
  return _user.created.quiz;
}
// Create a new quiz and embed
exports.createQuiz = async (req, res) => {
  const { id } = req.params;
  // format the quiz id(name) to be the same as the name with added underscores
  if (!req.body.id || req.body.id === '') {
    const nameString = req.body.name.split(' ');
    let modifiedString = '';
    for (const i of nameString) {
      modifiedString += `${i}_`;
    }
    req.body.id = modifiedString.substring(0, modifiedString.length-1);
  } else { req.body.id = undefined; } // setting to undefined allows the model to set the value to default
  for (const i in req.body.questions) { // add id field starting from 1 to all questions in quiz
    console.log(i);
    req.body.questions[i].id = parseInt(i) + 1;
  }
  const quizModel = await new Quiz(req.body);
  /*     const _user = await User.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `User with id: ${id} could not be found`});
            } else { return data; }})
            .catch(err => {
                res.status(500).send({ message: `Error retrieving user with id: ${id}` });
            }
        );  */
  // create and use a custom quiz schema model to assign _id fields to all new quizes
  // _user.created.quiz.push(req.body); //vanilla js "push" is used on the provided db object. Consider using mongodb operators directly.
  const _user = await User.findOneAndUpdate(
    { _id: id },
    { $push: { "created.quiz": quizModel } },
    { new: true, select: "created" },
  );
  res.status(200);
/*     (err, _data) => {
        if(err) {
            return res.status(500).send(err)
        } else {
            return res.status(200).send(_data);
        }
    } */
};
// Create a new user
exports.createUser = (req, res) => {
  console.log("user request recieved!");
  const _user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  _user.save(_user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};
// Get all mock quizes
exports.getMockQuestions = async (req, res) => {
  // retrieve all mock quizes
  const quizes = await Quiz.find()
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving quiz.",
      });
    });
    // if a user id parameter is provided in the request; push all custom quizes associated with that user and return the data
  if (req.params.id) {
    const userQuizes = await findUserQuiz(req.params.id);
    for (const i of userQuizes) {
      quizes.push(i);
    }
  }
  res.status(200).send(quizes);
};
exports.passport = passport;
