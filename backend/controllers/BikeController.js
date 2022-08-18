const Bikes = require("../models/Bikes");

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
