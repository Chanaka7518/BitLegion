const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const adminSchema = new Schema(
  {
    id: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String },
    email: { type: String },
    moNumber: { type: String },
    role: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admins", adminSchema);
