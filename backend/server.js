const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const eventRoutes = require("./routes/eventRoutes");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(logger);

app.get("/", (req, res) => {
  res.send("NearBy Events Finder Api is running");
});
app.use("/api", eventRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
