const express = require("express");
const {
  getAllBikes,
  getOneBike,
  createBike,
  updateBike,
  deleteBike,
  reserveBike,
  rateBike,
  getAllReservationsForBike,
  getAllAvailableBikes,
  getAllModels,
  getAllColors,
  getAllLocations,
  cancelReservation,
} = require("../controllers/BikeController");
const { isAuthAs } = require("../middleware/auth");
const router = express.Router();

router.get("/", isAuthAs(["admin"]), getAllBikes);

router.post("/", isAuthAs(["admin"]), createBike);

//populate filters
router.get("/models", isAuthAs(["user"]), getAllModels);

router.get("/colors", isAuthAs(["user"]), getAllColors);

router.get("/locations", isAuthAs(["user"]), getAllLocations);

router.get("/available", isAuthAs(["user"]), getAllAvailableBikes);

router.get("/:id/reservations", isAuthAs(["admin"]), getAllReservationsForBike);

router.post("/:id/rate", isAuthAs(["user"]), rateBike);

router.delete(
  "/reservations/:reservation_id",
  isAuthAs(["user"]),
  cancelReservation
);

router.get("/:id", isAuthAs(["admin"]), getOneBike);

router.put("/:id", isAuthAs(["admin"]), updateBike);

router.delete("/:id", isAuthAs(["admin"]), deleteBike);

router.post("/:id/reserve", isAuthAs(["user"]), reserveBike);

module.exports = router;
