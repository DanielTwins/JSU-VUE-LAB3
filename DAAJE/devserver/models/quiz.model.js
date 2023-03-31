module.exports = mongoose => {
    const Example = mongoose.model(
      "example",
      mongoose.Schema(
        {
          title: String,
          description: String,
          published: Boolean
        },
        { timestamps: true }
      )
    );
  
    return Example;
  };