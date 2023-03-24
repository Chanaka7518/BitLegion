const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const coacheSchema = new Schema(
  {
    id: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String }, // check min length with backend
    address: { type: String },
    nicNo: { type: String },
    gender: { type: String },
    moNumber: { type: String },
    whatsApp: { type: String },
    lLine: { type: String },
    email: { type: String },
    webSite: { type: String },
    athleticArchievements: [String],
    experiences: [String],
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

    personalTraining: {
      title: { type: String },
      rate: { type: String },
      minOrderNumber: { type: String },
      discount: { type: String },
      from: { type: String },
      to: { type: String },
    },
    onlineCoaching: {
      title: { type: String },
      rate: { type: String },
      minOrderNumber: { type: String },
      discount: { type: String },
      from: { type: String },
      to: { type: String },
    },

    socialMediaAccounts: [String],
    isSubscribedNewsletter: { type: Boolean },
    certifictes: {
      urls: { type: String },
      pdfData: [Schema.Types.Mixed],
    },
  },
  { timestamps: true }
);

coacheSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Coach", coacheSchema);
