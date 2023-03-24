const uuid = require("uuid/v4");
const { validationResult } = require("express-validator"); // to give error message after validation
const HttpError = require("../models/http-error.js");
const Coach = require("../models/coaches");

// ---------------------------------------------------------------get coaches-----------------------------------------------------------------------
const getCoach = async (req, res, next) => {
  let userId = req.user.userId;
  let coach;
  try {
    coach = await Coach.findById(userId);
    console.log("Hari");
    console.log(coach);
    return res.send(coach);
  } catch (err) {
    res.send({ message: "Process faild.Please try again" });
    const error = new HttpError("Process faild.Please try again", 500);
    next(error);
  }

  if (!coach) {
    // if the user is not found in either collection, send an error response
    res.send({ message: "User not found" });
    const error = new HttpError("User not found", 401);
    return next(error);
  }
};

// ----------------------------------------------------------get coaches using ID-------------------------------------------------------------------

// ---------------------------------------------------------get coaches by using userId----------------------------------------------------------------

// ---------------------------------------------------------------------module exports-------------------------------------------------------------------

exports.getCoach = getCoach;
