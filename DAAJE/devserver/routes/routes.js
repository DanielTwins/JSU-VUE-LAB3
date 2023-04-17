const express = require("express");

const router = express.Router();
const mwFunction = require("./middleware");
const controller = require("../controllers/controller");
const { passport } = require("../controllers/controller");

// REGISTER OUR ROUTES -------------------------------

/* GET request for quiz content */
router.get("/quiz_questions/:id?", controller.getMockQuestions);
router.get("/results/:id", controller.getUserResults);
// **NEW mongoDB route**
router.post("/post/create_quiz/:id", controller.createQuiz);
/* POST and send compiled stundent result data */
router.post("/post/result/:id/:takenQuizId/:userOrigin?", controller.writeResult); // **remember to listen for "id" query if needed**
/* POST create a new user in mongoDB from the register form */
router.post("/post/new_user", controller.createUser);
/* POST Login */
router.post("/post/login", passport.authenticate("local"), (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(400).send(err);
    }
    if (!user) {
      return res.status(400).send({ msg: err });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(`success auth for ${req.user}`);
      return res.status(200).send(user.id);
    });
  })(req, res, next);
});

// ----------------------------------------------------

module.exports = router;
