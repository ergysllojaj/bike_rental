const express = require("express");
const {
  getAllBikes,
  getOneBike,
  createBike,
  updateBike,
  deleteBike,
} = require("../controllers/BikeController");
const router = express.Router();

router.get("/", getAllBikes);

router.get("/:id", getOneBike);

router.post("/", createBike);

router.put("/:id", updateBike);

router.delete("/:id", deleteBike);

module.exports = router;
