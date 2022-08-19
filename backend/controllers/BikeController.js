const Bikes = require("../models/Bike");
const Users = require("../models/User");
const Reservation = require("../models/Reservation");

//get all bikes
module.exports.getAllBikes = (req, res) => {
  Bikes.find({})
    .then((bikes) => {
      if (!bikes) {
        return res.status(404).json({
          error: "No bikes found",
        });
      }
      res.status(200).json(bikes);
    })
    .catch((err) => {
      res.status(404).json({ error: "Error finding the bikes !" });
    });
};

//get one bike
module.exports.getOneBike = (req, res) => {
  Bikes.findById(req.params.id)
    .then((bike) => {
      res.status(200).json(bike);
    })
    .catch((err) => {
      res.status(400).json({ error: "Error finding the bike !" });
    });
};

//create a bike
module.exports.createBike = (req, res) => {
  console.log("Starting adding new bike!");

  const { model, color, location, rating, isAvailable } = req.body;

  Bikes.create({ model, color, location, rating: +rating, isAvailable })
    .then((bike) => {
      res.status(200).json(bike);
    })
    .catch((err) => {
      res
        .status(400)
        .json({ error: "Error saving the new bike! Please try again!" });
    });
};

//update a bike
module.exports.updateBike = (req, res) => {
  Bikes.findByIdAndUpdate(req.params.id, req.body)
    .then((bike) => {
      res.status(200).json(bike);
    })
    .catch((err) => {
      res.status(400).json({ error: "Error updating the bike !" });
    });
};

//delete a bike
module.exports.deleteBike = (req, res) => {
  Bikes.findByIdAndDelete(req.params.id)
    .then((bike) => {
      res.status(200).json(bike);
    })
    .catch((err) => {
      res.status(400).json({ error: "Error deleting the bike!" });
    });
};

//reserve a bike
module.exports.reserveBike = (req, res) => {
  const { startDate, endDate } = req.body;
  const { id } = req.params;
  const { userId } = res;
  //check if bike is available
  Reservation.find({ bikeId: id })
    .where("startDate")
    .lte(new Date(endDate))
    .where("endDate")
    .gte(new Date(startDate))
    .then((reservations) => {
      if (reservations.length > 0) {
        return res.status(400).json({
          error: "Bike is not available for the given dates",
        });
      } else {
        //create a new reservation
        Reservation.create({
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          bike: id,
          user: userId,
        })
          .then((reservation) => {
            res.status(200).json(reservation);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ error: "Error reserving the bike!" });
          });
      }
    });
};

//get all users reserved bikes
module.exports.getAllReservations = (req, res) => {
  Reservation.find()
    .populate("user", { email: 1 })
    .populate("bike", { model: 1, color: 1, location: 1 })
    .then((reservations) => {
      if (!reservations) {
        return res.status(404).json({
          error: "No reservations found",
        });
      }
      console.log(reservations);
      res.status(200).json(reservations);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: "Error finding the reservations !" });
    });
};
