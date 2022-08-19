const mongooes = require("mongoose");
const Schema = mongooes.Schema;

const reservationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bike: {
      type: Schema.Types.ObjectId,
      ref: "Bike",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongooes.model("Reservation", reservationSchema);
