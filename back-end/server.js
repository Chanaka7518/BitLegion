const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const common = require("./routes/CommonRoutes");

const HttpError = require("./models/http-error");
const cors = require("cors");

const server = express();

server.use(bodyParser.json());
mongoose.set("strictQuery", true);
// to avoid cors
server.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

//  users
server.use("/api", common);

server.use((req, res, next) => {
  res.send({ message: "Could not find this route" });
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

// normal erros
server.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});
mongoose
  .connect(
    "mongodb+srv://Chanaka:Prasanna@bitlegion.vt4wn4z.mongodb.net/AlphaLee?retryWrites=true&w=majority"
  )
  .then(
    server.listen(5001, () => {
      console.log("Server is listening on port 5001");
    })
  )
  .catch((err) => {
    console.log(err);
  });
