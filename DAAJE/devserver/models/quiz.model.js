const mockQuiz = mongoose => {
    const Quiz = mongoose.model(
      "mock_quiz",
      mongoose.Schema(
        {
          id: String,
          img: String,
          name: String,
          questions: Array,
          published: Boolean
        }
      )
    );
    return Quiz;
  };

module.exports = mockQuiz;