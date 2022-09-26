import { Router } from "express";

import { failedResponse, successResponse } from "../models/MyResponse";
import Trip from "../models/Trip";
import User from "../models/User";
import log from "../utils/logger";
import { verifyToken } from "../utils/token";
import { createTripValidate } from "../utils/validators/trip";

const tripRoute = Router();

tripRoute.put("/", verifyToken, async (req, res) => {
  log("create trip", req.body);

  const { error } = createTripValidate(req.body);
  if (error) {
    return res.status(400).json(failedResponse(error.message));
  }

  try {
    const tripModel = new Trip({
      owner: req.body["owner"],
      title: req.body["title"],
      location: req.body["location"],
      numberOfPeople: req.body["numberOfPeople"],
      startDate: req.body["startDate"],
      endDate: req.body["endDate"],
      transport: req.body["transport"],
    });

    const trip = await tripModel.save();

    await User.findOneAndUpdate(
      { email: trip.owner },
      { $push: { trips: trip.id } }
    );

    res.json(successResponse(trip));
  } catch (err: any) {
    res.status(500).json(failedResponse(err["message"]));
  }
});

export default tripRoute;
