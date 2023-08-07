const { Schema, Types } = require("mongoose");
const workoutSchema = new Schema(
  {
    workoutId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    workoutBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleDateString(),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = workoutSchema;
