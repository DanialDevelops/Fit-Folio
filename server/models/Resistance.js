const { Schema, Types } = require("mongoose");
const resistanceSchema = new Schema(
  {
    resistanceId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    resistanceBody: {
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

module.exports = resistanceSchema;
