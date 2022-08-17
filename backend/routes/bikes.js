const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "All Bikes" });
});

router.get("/:id", (req, res) => {
  res.json({ message: "Bike" + req.params.id });
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.json({ message: "Create Bike" });
});

router.put("/:id", (req, res) => {
  console.log(req.body);
  res.json({ message: "Update Bike" + req.params.id });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "Delete Bike" + req.params.id });
});

module.exports = router;
