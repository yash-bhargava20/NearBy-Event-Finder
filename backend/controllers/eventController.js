const { v4: uuidv4 } = require("uuid");
const haversine = require("../utils/haversine");
const eventsData = require("../data/events");

const getAllEvents = (req, res) => {
  res.json(eventsData);
};

const events = [];

const createEvent = (req, res) => {
  const {
    name,
    description,
    latitude,
    longitude,
    category,
    date,
    time,
    price,
    venue,
  } = req.body;

  if (!name || latitude == null || longitude == null) {
    return res
      .status(400)
      .json({ message: "Name, latitude, and longitude are required" });
  }

  const newEvent = {
    id: uuidv4(),
    name,
    description: description || "",
    latitude,
    longitude,
    category: category || "Community",
    date,
    time,
    price,
    venue,
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
};

const getNearbyEvents = (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lng = parseFloat(req.query.lng);
  const radius = parseFloat(req.query.radius) || 10;
  const category = req.query.category;
  if (isNaN(lat) || isNaN(lng)) {
    return res.status(400).json({ message: "missing latitude or longitude" });
  }

  const results = events
    .map((ev) => ({
      ...ev,
      distanceKm: haversine(lat, lng, ev.latitude, ev.longitude),
    }))
    .filter((ev) => ev.distanceKm <= radius)
    .filter((ev) =>
      category
        ? ev.category.toLowerCase() === String(category).toLowerCase()
        : true
    )
    .sort((a, b) => a.distanceKm - b.distanceKm);

  res.json(results);
};

module.exports = {
  getAllEvents,
  createEvent,
  getNearbyEvents,
};
