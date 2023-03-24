const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const clientSchema = new Schema(
  {
    id: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String }, // check min length with backend
    email: { type: String },
    moNumber: { type: String },
    gender: { type: String },
    role: { type: String },
    verifytoken: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          // required: true,
        },
      },
    ],

    // isSubscribedNewsletter: { type: Boolean },
  },
  { timestamps: true }
);

clientSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Client", clientSchema);
