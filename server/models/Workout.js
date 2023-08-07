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
    repBody: {
      type: Number,
      required: false,
      default: 0,
    },
    restTime: {
      type: Number,
      required: false,
      default: 0,
    },
    setBody: {
      type: Number,
      required: false,
      default: 0,
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
