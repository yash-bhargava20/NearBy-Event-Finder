const express = require("express");
const router = express.Router();
const {
  getAllEvents,
  getNearbyEvents,
  createEvent,
} = require("../controllers/eventController");

router.get("/events", getAllEvents);
router.get("/nearby", getNearbyEvents);
router.post("/events", createEvent);

module.exports = router;
