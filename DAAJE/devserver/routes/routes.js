const express           = require("express");
const router            = express.Router();
const mwFunction        = require("./middleware");
const controller        = require("../controllers/controller")

// REGISTER OUR ROUTES -------------------------------

// Head
router.get("/", function (req, res) {
  res.send(200, "Welcome to the API!");
});
/* GET request for quiz content */
router.get("/quiz_questions", mwFunction.getMockQuestions);
/* POST default handling */
router.post("/post", function (req, res) {
  console.log("post recieved");
  console.log(req.body);
  res.json({ status: "200 OK", content: req.body });
});
/* POST quiz. Handler fn assigns a uuid to the url and redirects below to continue the request */
router.post("/post/create_quiz", mwFunction.assignQuizId, mwFunction.writeNewQuiz);
/* POST and send compiled stundent result data */
router.post("/post/result", mwFunction.recieveResult, mwFunction.sendResults); // **remember to listen for "id" query if needed**
/* POST create a new user in mongoDB from the register form */
router.post("/post/new_user", controller.createUser);

// ----------------------------------------------------

module.exports = router;
