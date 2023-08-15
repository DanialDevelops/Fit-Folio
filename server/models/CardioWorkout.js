const mongoose = require("mongoose");

const cardioWorkoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  workoutName: String,
  distance: String,
  duration: String,
  date: Date,
});

const CardioWorkout = mongoose.model("CardioWorkout", cardioWorkoutSchema);

module.exports = CardioWorkout;