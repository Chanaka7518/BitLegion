const express = require("express");

const { check } = require("express-validator");
const commonRouter = express.Router();
const commonController = require("../controllers/commonController.js");

//################################## Common ##############################
//-----------------User log in--------------------------------------------
commonRouter.post("/login", commonController.login);

//-----------------send password rest link--------------------------------
commonRouter.post(
  "/sendPwdResetLink",

  commonController.sendPwdResetLink
);

//------------------get details and add new password and verify
commonRouter.get("/newPassword/:id/:token", commonController.verifyUser);

//------------------Update new password-----------------------------------
commonRouter.post(
  "/changePassword/:id/:token",
  commonController.changePassword
);

//################################# user sign up #########################

//------------------Sign up HeadCoach-------------------------------------
commonRouter.post("/signupHeadCoach/:token", commonController.signupHeadCoach);

//------------------Generate a link---------------------------------------
commonRouter.post("/generatelink", commonController.generateLink);

//------------------Sign up Client----------------------------------------
commonRouter.post("/signup", commonController.signupClient);

//------------------Sign up Admin-----------------------------------------
commonRouter.post("/signupAdmin", commonController.signupAdmin);

//################################# HeadCoach ############################

//get clients
commonRouter.get("/getclients", commonController.getClients);
commonRouter.post("/sendMail", commonController.sendMail);

//get coach:id
commonRouter.get("/coach/:userId", commonController.getCoach);

//################################# admin ############################
// get coaches
commonRouter.get("/getcoaches", commonController.getCoachList);

module.exports = commonRouter;
