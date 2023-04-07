const mockQuiz = mongoose => {
    const Quiz = mongoose.model(
      "mock_quiz",
      mongoose.Schema(
        {
          _id: Number,
          img: String,
          name: String,
          questions: Array,
          published: Boolean
        },
        {
          _id: true
        }
      )
    );
    return Quiz;
  };

module.exports = mockQuiz;