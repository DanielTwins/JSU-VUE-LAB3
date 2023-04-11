const express           = require("express");
const router            = express.Router();
const mwFunction        = require("./middleware");
const controller        = require("../controllers/controller");
const { passport }      = require("../controllers/controller");

// REGISTER OUR ROUTES -------------------------------

/* GET request for quiz content */
router.get("/quiz_questions/:id?", controller.getMockQuestions);
/* POST quiz. Handler fn assigns a uuid to the url and redirects below to continue the request. **OLD fs route** */
//router.post("/post/create_quiz", mwFunction.assignQuizId, mwFunction.writeNewQuiz);
// **NEW mongoDB route**
router.post("/post/create_quiz/:id", controller.createQuiz);
/* POST and send compiled stundent result data */
router.post("/post/result", mwFunction.recieveResult, mwFunction.sendResults); // **remember to listen for "id" query if needed**
/* POST create a new user in mongoDB from the register form */
router.post("/post/new_user", controller.createUser);
/* POST Login */
router.post("/post/login", passport.authenticate("local"), (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err) {
            return res.status(400).send(err);
        }
        if(!user) {
            return res.status(400).send({msg: err});
        }
        req.logIn(user, function(err) {
            if(err) { 
                return res.status(500).send(err); 
            }
            console.log("success auth for " + req.user);
            return res.status(200).send(user.id);
        });
    })(req, res, next)});

// ----------------------------------------------------

module.exports = router;
