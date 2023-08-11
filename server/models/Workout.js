const { Schema, Types } = require("mongoose");
const workoutSchema = new Schema(
  {
    workoutId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    workoutType: {
      type: String,
      required: true,
    },
    workoutName: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: false,
    },
    duration: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: false,
    },
    sets: {
      type: Number,
      required: false,
    },
    reps: {
      type: Number,
      required: false,
    },
    restTime: {
      type: String,
      required: false,
    },
    weight: {
      type: String,
      required: false,
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