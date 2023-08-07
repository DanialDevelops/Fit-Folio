const { Schema, model } = require("mongoose");
const resistanceSchema = require("./Resistance");

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
    username: {
      type: String,
      required: true,
    },
    resistance: [resistanceSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

sessionsSchema.virtual("resistanceCount").get(function () {
  return this.resistance.length;
});

const Sessions = model("Sessions", sessionsSchema);

module.exports = Sessions;
