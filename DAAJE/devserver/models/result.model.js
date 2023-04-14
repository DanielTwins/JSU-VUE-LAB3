/* eslint-disable */

const { ObjectID } = require("bson");
const { ObjectId } = require("mongodb");

const result = mongoose => {
    const Result = mongoose.model(
        "result",
        mongoose.Schema(
            {
                takenQuizId: {
                    type: ObjectId,
                  },
                resultData: {
                    type: Array,
                    required: true
                  },
                
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