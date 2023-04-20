/* eslint-disable */
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
            students: [{
              type: mongoose.Schema.Types.ObjectId,
              ref: user
            }]
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