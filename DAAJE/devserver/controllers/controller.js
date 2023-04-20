/* eslint-disable */
// controller functions for mongodb

// passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
// mongodb
const db = require('../models');
const { mongoose } = require('../models');
const User = db.user;
const Quiz = db.quiz;
const Result = db.result;

// use definitions
passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'Incorrect e-mail' });
        }
        
        await bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! Log user in
            return done(null, user);
          } else {
            console.log(err);
            // passwords do not match.
            return done(null, false, { message: 'Incorrect password' });
          }
        });
      } catch (err) {
        return done(err);
      }
    }
  )
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
      } else {
        return data;
      }
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
    req.body.id = modifiedString.substring(0, modifiedString.length - 1);
  } else {
    req.body.id = undefined;
  } // setting to undefined allows the model to set the value to default
  for (const i in req.body.questions) {
    // add id field starting from 1 to all questions in quiz
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
    { $push: { 'created.quiz': quizModel } },
    { new: true, select: 'created' }
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
  console.log('user request recieved!');

  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    const _user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    _user
      .save(_user)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the user.',
        });
      });
  });
};
// Get all mock quizes
exports.getMockQuestions = async (req, res) => {
  // retrieve all mock quizes
  const quizes = await Quiz.find().catch((err) => {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving quiz.',
    });
  });
  // if a user id parameter is provided in the request; push all custom quizes associated with that user and return the data
  if (req.params.id) {
    const userQuizes = await findUserQuiz(req.params.id);
    for (const i of userQuizes) {
      quizes.push(i);
    }
    res.status(200).send(quizes);
  }
}; 
exports.getSpecifiedUserQuiz = async (req, res) => {
  const ouid = mongoose.Types.ObjectId(req.params.originUserId);
  const quizId = mongoose.Types.ObjectId(req.params.quizId);
  const foundQuiz = await User.aggregate([
    {
      '$match': {
        '_id': ouid
      }
    }, {
      '$project': {
        'created.quiz': {
          '$filter': {
            'input': '$created.quiz', 
            'as': 'quizes', 
            'cond': {
              '$eq': [
                '$$quizes._id', quizId
              ]
            }
          }
        }
      }
    }, {
      '$project': {
        'created.quiz.usersTakenQuiz': 0
      }
    }, {
      '$replaceRoot': {
        'newRoot': '$created'
      }
    }
  ]);
  // return desired quiz. Syntax is messy but necessary unless sorting is improved in pipeline
  res.status(200).send(foundQuiz[0].quiz);
};
exports.writeResult = async (req, res, next) => { //add error handlers
    const uid = req.params.id;
    const takenQuizId = req.params.takenQuizId;
    const userOrigin = req.params.userOrigin;
    const newResult = await new Result({resultData: req.body.resultData, takenQuizId: takenQuizId});
    const updatedResults = await User.findOneAndUpdate(
        { _id: uid }, 
        { $push: {"results": newResult} },
        { select: "results", new: true }
    );
    // cast to appropriate BSON identifiers for mongodb to work
    const typeCastId = new mongoose.Types.ObjectId(uid);
    const typeCastTakenQuizId = new mongoose.Types.ObjectId(takenQuizId);
    // add the user who did the quiz, to the creators result-tracking array(id only, populate with model later)
    const updatedEndUser = await User.updateOne(
      { _id: userOrigin, "created.quiz._id": typeCastTakenQuizId },
      { $push: {"created.quiz.$.usersTakenQuiz": typeCastId} }
    );
    console.log(updatedEndUser); //if modified count is 0, no custom-quiz creator was found
    res.status(200).send(updatedResults);
};
exports.getUserResults = async (req, res) => {
    const uid = req.params.id;
    const results = await User.findOne(
        { _id: uid }, 
        "results"
    );
    console.log(results);
    res.status(200).send(results);
};
exports.getOwnCustomQuizResults = async (req, res) => {
  const uid = mongoose.Types.ObjectId(req.params.id);
  //get an array of the users who have taken our quizes
  const userList = await User.aggregate([
    {
      '$match': {
        'username': 'elis'
      }
    }, {
      '$project': {
        'created.quiz': {
          '$filter': {
            'input': '$created.quiz', 
            'as': 'quizes', 
            'cond': 1
          }
        }
      }
    }, {
      '$project': {
        'created.quiz.usersTakenQuiz': 1, 
        'created.quiz._id': 1
      }
    }, {
      '$replaceRoot': {
        'newRoot': '$created'
      }
    }
  ]);
  //get all users from their array id:s. Deconstruct and extract the result data and bundle it with the corresponing quizId
  for(const i of userList[0].quiz) {
    let result = await User.find({"_id": {$in: i.usersTakenQuiz}}).select(["results", {"results.takenQuizId": i._id}]);
    i.sessionResults = result;
    // remove unneccesary array after usage
    delete i.usersTakenQuiz;
  }
  //send the relevant array
  res.status(200).send(userList[0].quiz);
};
exports.passport = passport;