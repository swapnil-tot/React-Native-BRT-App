const express = require("express");
const {
  getBusList,
  createBus,
  updateBus,
  deleteBus,
  getBus,
  getRouteBuses,
  getStationList,
  createStation,
  getStationPagesList,
} = require("../controllers/busController");
const { paginatedResults } = require("../utils/paginationFunction");
const stationModel = require("../models/stationModel");

const router = express.Router();

router.route("/").get(getBusList);

router.route("/").post(createBus);

router.route("/stations").get(getStationList).post(createStation);

router
  .route("/station")
  .get(paginatedResults(stationModel), getStationPagesList);

router.route("/:id").get(getBus).put(updateBus).delete(deleteBus);

router.route("/:start_station/:end_station").get(getRouteBuses);

module.exports = router;
