const mockQuiz = mongoose => {
    const Quiz = mongoose.model(
      "mock_quiz",
      mongoose.Schema(
        {
          id: String,
          img: String,
          name: String,
          questions: Array,
          category: String,
          language: String
        },
        {
          _id: true
        }
      )
    );
    return Quiz;
  };

module.exports = mockQuiz;