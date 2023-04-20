/* eslint-disable */

const mockQuiz = mongoose => {
    const Quiz = mongoose.model(
      "mock_quiz",
      mongoose.Schema(
        {
          id: {
            type: String,
            default: "custom"
          },
          img: {
            type: String,
            default: "./src/img/placeholder_img.jpg"
          },
          name: String,
          questions: Array,
          category: String,
          language: String,
          usersTakenQuiz: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
          }]
        },
        {
          _id: true
        }
      )
    );
    return Quiz;
  };

module.exports = mockQuiz;