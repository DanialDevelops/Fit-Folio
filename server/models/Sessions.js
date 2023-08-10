const { Schema, model } = require("mongoose");
const workoutSchema = require("./Workout");

const sessionsSchema = new Schema(
  {
    sessionsText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleDateString(),
    },
    workout: [workoutSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

sessionsSchema.virtual("workoutCount").get(function () {
  return this.workout.length;
});

const Sessions = model("Sessions", sessionsSchema);

module.exports = Sessions;
