/* eslint-disable */

const result = mongoose => {
    const Result = mongoose.model(
        "result",
        mongoose.Schema(
            {
                takenQuizId: {
                    type: mongoose.Types.ObjectId
                  },
                resultData: {
                    type: Array,
                    required: true
                  },     
                dateTaken: {
                    type: Date,
                    default: Date.now
                }  
            },
            {
                _id: true,
                timestamps: {
                    createdAt: true,
                    updatedAt: false
                }
            }
        )
    );
    return Result;
};

module.exports = result;