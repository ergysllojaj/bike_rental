const mongooes = require("mongoose");

const Schema = mongooes.Schema;

const bikesSchema = new Schema(
  {
    model: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongooes.model("Bikes", bikesSchema);
