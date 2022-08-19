const express = require("express");
const {
  getAllBikes,
  getOneBike,
  createBike,
  updateBike,
  deleteBike,
  reserveBike,
} = require("../controllers/BikeController");
const { isAuthAs } = require("../middleware/auth");
const router = express.Router();

router.get("/", isAuthAs(["admin"]), getAllBikes);

router.get("/:id", isAuthAs(["admin"]), getOneBike);

router.post("/", isAuthAs(["admin"]), createBike);

router.put("/:id", isAuthAs(["admin"]), updateBike);

router.delete("/:id", isAuthAs(["admin"]), deleteBike);

router.post("/:id/reserve", isAuthAs(["user"]), reserveBike);

module.exports = router;
