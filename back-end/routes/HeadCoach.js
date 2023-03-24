const express = require("express");

const { check } = require("express-validator");
const CoachesController = require("../controllers/coaches-controller");
const router = express.Router();

router.get("/coach/:userId", CoachesController.getCoach);

//------------------get coach details-------------------------------------

module.exports = router;
