const mongoose = require("mongoose");

const weightWorkoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sets: String,
  reps: String,
  restTime: String,
  weight: String,
});

const WeightWorkout = mongoose.model("WeightWorkout", weightWorkoutSchema);

module.exports = WeightWorkout;