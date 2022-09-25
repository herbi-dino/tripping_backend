import { Router } from "express";

import { failedResponse, successResponse } from "../models/MyResponse";
import Trip from "../models/Trip";
import { verifyToken } from "../utils/token";
import { createTripValidate } from "../utils/validators/trip";

const tripRoute = Router();

tripRoute.put("/", verifyToken, async (req, res) => {
  console.log("[tripping] create trip:", req.body);

  const { error } = createTripValidate(req.body);
  if (error) {
    return res.status(400).json(failedResponse(error.message));
  }

  try {
    const trip = new Trip({
      owner: req.body["owner"],
      title: req.body["title"],
      location: req.body["location"],
      numberOfPeople: req.body["numberOfPeople"],
      startDate: req.body["startDate"],
      endDate: req.body["endDate"],
      transport: req.body["transport"],
    });

    // const [tripRes, owner] = await Promise.all([
    //   trip.save(),
    //   User.findOne({ _id: trip.owner }),
    // ]);

    const tripRes = await trip.save();

    res.json(successResponse(tripRes));
  } catch (err: any) {
    res.status(500).json(failedResponse(err["message"]));
  }
});

export default tripRoute;
