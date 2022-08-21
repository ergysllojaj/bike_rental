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

//get all available bikes
module.exports.getAllAvailableBikes = async function (req, res) {
  if (!req.query.startDate || !req.query.endDate) {
    try {
      const bikes = await Bikes.find({ isAvailable: true });
      return res.status(200).json(bikes);
    } catch (err) {
      return res.status(400).json({ error: "Error finding the bikes !" });
    }
  }

  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);
  const model = req.query.model;
  const location = req.query.location;
  const color = req.query.color;
  let filters = {};
  filters.isAvailable = true;

  if (startDate > endDate) {
    return res.status(400).json({
      error: "Start date cannot be after end date",
    });
  }

  if (model) {
    filters.model = model;
  }
  if (location) {
    filters.location = location;
  }
  if (color) {
    filters.color = color;
  }

  try {
    const reservedBikes = await Reservation.find()
      .populate("bike", { _id: 1 })
      .where("startDate")
      .lte(endDate)
      .where("endDate")
      .gte(startDate)
      .select("bike");

    const bikes = await Bikes.find(filters).where({
      _id: { $nin: reservedBikes.map((bike) => bike.bike._id) },
    });
    res.status(200).json(bikes);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Error finding the bikes !" });
  }
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
  console.log(req.body, req.params.id);
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

//get all users who reserved bikes
module.exports.getAllReservationsForBike = (req, res) => {
  Reservation.find({ bike: req.params.id })
    .populate("user", { email: 1 })
    .populate("bike", { model: 1, color: 1, location: 1 })
    .then((reservations) => {
      if (!reservations) {
        return res.status(404).json({
          error: "No reservations found",
        });
      }
      res.status(200).json(reservations);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: "Error finding the reservations !" });
    });
};

//get all users who reserved bikes
module.exports.getAllReservationsForUser = (req, res) => {
  Reservation.find({ user: req.params.id })
    .populate("user", { email: 1 })
    .populate("bike", { model: 1, color: 1, location: 1 })
    .then((reservations) => {
      if (!reservations) {
        return res.status(404).json({
          error: "No reservations found",
        });
      }
      res.status(200).json(reservations);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: "Error finding the reservations !" });
    });
};

//cancle a reservation
module.exports.cancelReservation = async function (req, res) {
  const reservation = await Reservation.findByIdAndDelete(
    req.params.reservation_id
  ).where({
    startDate: { $gte: new Date() },
  });
  if (!reservation) {
    return res.status(404).json({
      error: "Reservation can not be cancelled",
    });
  }
  res.status(200).json(reservation);
};
module.exports.rateBike = async function (req, res) {
  const rate = req.body.rating;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({
      error: "Rating must be between 1 and 5",
    });
  }
  const id = req.params.id;
  const bike = await Bikes.findById(id);
  if (!bike) {
    return res.status(404).json({
      error: "Bike not found",
    });
  }
  bike.rating =
    (bike.rating * bike.ratingCount + rate) / (bike.ratingCount + 1);

  bike.ratingCount++;
  bike.save();
  bike.rating = Math.round(bike.rating * 100) / 100;
  res.status(200).json(bike);
};
//TODO refctor into 1 function /filters?filter=model&value=modelValue

module.exports.getAllModels = async function (req, res) {
  try {
    const models = await Bikes.find({}).distinct("model");
    res.status(200).json(models);
  } catch (err) {
    res.status(400).json({ error: "Error finding the models !" });
  }
};

module.exports.getAllColors = async function (req, res) {
  try {
    const colors = await Bikes.find({}).distinct("color");
    res.status(200).json(colors);
  } catch (err) {
    res.status(400).json({ error: "Error finding the colors !" });
  }
};

module.exports.getAllLocations = async function (req, res) {
  try {
    const locations = await Bikes.find({}).distinct("location");
    res.status(200).json(locations);
  } catch (err) {
    res.status(400).json({ error: "Error finding the locations !" });
  }
};
