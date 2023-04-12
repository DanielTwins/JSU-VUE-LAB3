const user = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          username: {
            type: String,
            trim: true,
            required: true,
            unique: true,
           },
          email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
           },
          password: {
            type: String,
            required: true
           },
          associated: {
            quiz: Array,
            students: Array
           },
          created: {
            quiz: Array
          },
          results: {
            type: Array
          }
        },
        { timestamps: true },
        { strict: false }
      )
    );
  
    return User;
  };

module.exports = user;