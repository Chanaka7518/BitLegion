const express = require("express");

const { check } = require("express-validator");
const routerClient = express.Router();
const ClientController = require("../controllers/client-controller");

routerClient.post("/signup", ClientController.signup);
// routerClient.post("/login", ClientController.login);
// routerClient.post(
//   "/login/sendpasswordlinkToClient",
//   ClientController.forgotPwdClient
// );

// routerClient.get("/login/newPassword/:id/:token", ClientController.newPassword);
// routerClient.post("/:id/:token", ClientController.changePassword);

module.exports = routerClient;
