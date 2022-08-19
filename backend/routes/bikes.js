const express = require("express");
const {
  getAllBikes,
  getOneBike,
  createBike,
  updateBike,
  deleteBike,
  reserveBike,
  getAllReservationsForBike,
} = require("../controllers/BikeController");
const { isAuthAs } = require("../middleware/auth");
const router = express.Router();

router.get("/", isAuthAs(["admin"]), getAllBikes);
router.post("/", isAuthAs(["admin"]), createBike);

router.get("/:id/reservations", isAuthAs(["admin"]), getAllReservationsForBike);

router.get("/:id", isAuthAs(["admin"]), getOneBike);

router.put("/:id", isAuthAs(["admin"]), updateBike);

router.delete("/:id", isAuthAs(["admin"]), deleteBike);

router.post("/:id/reserve", isAuthAs(["user"]), reserveBike);

module.exports = router;
