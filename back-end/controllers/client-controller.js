const uuid = require("uuid/v4");
const { validationResult } = require("express-validator"); // to give error message after validation
const HttpError = require("../models/http-error.js");
const Client = require("../models/clients");
const Coach = require("../models/coaches");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// ----------------------------signup-------------------------------

const signup = async (req, res, next) => {
  const errors = validationResult(req); //validation errors
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError("Invalid input passed. Please check your data", 422)
    );
  }

  const { firstName, lastName, password, email, mobileNumber, gender } =
    req.body;

  // check for existing client

  let existingClient;
  try {
    existingClient = await Client.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Signup faild.Please try again", 500);
    return next(error);
  }
  if (existingClient) {
    const error = new HttpError(
      "User already exists,Please try again instead",
      422
    );
    return next(error);
  }

  // hashed password

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12); // 12 is salt value
  } catch (err) {
    const error = new HttpError("Couldn't create user, please try again", 500);
    return next(error);
  }

  const createdClient = new Client({
    id: uuid(),
    firstName: firstName,
    lastName: lastName,
    password: hashedPassword,
    gender: gender,
    moNumber: mobileNumber,
    email: email,
    verifytoken: "",

    // isSubscribedNewsletter: isSubscribedNewsletter,
  });
  console.log(createdClient);

  try {
    await createdClient.save();
  } catch (err) {
    const error = new HttpError(
      "Signning up faild,Please try again later",
      500
    );
    return next(error);
  }

  let token;
  // here i use the id that generaete the mongodb itself
  try {
    token = jwt.sign(
      { userId: createdClient.id, email: createdClient.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Signning up faild,Please try again later",
      500
    );
    return next(error);
  }
  res.status(201).json({
    usertId: createdClient.id,
    email: createdClient.email,
    token: token,
  });
};

//--------------------------------login------------------------------

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingClient;
  let existingCoach;
  try {
    existingClient = await Client.findOne({ email: email });
    existingCoach = await Coach.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Loging in faild.Please try again", 500);
    return next(error);
  }

  if (!existingClient && !existingCoach) {
    const error = new HttpError(
      "Invalid credentials, could not log you in",
      401
    );
    return next(error);
  }

  //check password with hashed password
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingClient.password); // it compares the bcrypted  password  matches with the user's pwd that request to login
  } catch (err) {
    // this error in server side. So does not thrwo if we have invalid credentials
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again",
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    // if user exists and it was invalid credentials
    const error = new HttpError(
      "Invalid credentials, could not log you in",
      401
    );
    return next(error);
  }

  //jwt token
  let token;

  try {
    token = jwt.sign(
      { userId: existingClient.id, email: existingClient.email },
      "supersecret_dont_share", // this private key should be same as signup process
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Logging in faild,Please try again later", 500);
    return next(error);
  }
  res.json({
    userId: existingClient.id,
    email: existingClient.email,
    token: token,
  });
};

//--------------------forgotPwd--------------------------------------------------

//.email config

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bitlegioninfo@gmail.com",
    pass: "ayzggsrtobpayzuh",
  },
});

const forgotPwdClient = async (req, res, next) => {
  const { email } = req.body;

  let existingClient;
  try {
    existingClient = await Client.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Resetting failed.Please try again", 500);

    return next(error);
  }

  if (!existingClient) {
    res.send({ message: "User does not exists" });
    const error = new HttpError(
      "Invalid credentials, user does not exists",
      401
    );

    return next(error);
  }

  const token = jwt.sign(
    { userId: existingClient.id },
    "supersecret_dont_share",
    { expiresIn: "1d" }
  );
  // check weather the user is same as user that  requested to reset pwd

  const setUserToken = await Client.findByIdAndUpdate(
    { _id: existingClient._id }, // here should be mongodb _id.But not Id that we generated
    { verifytoken: token },
    {
      new: true,
    }
  );

  if (setUserToken) {
    const mailOptions = {
      from: "bitlegioninfo@gmail.com",
      to: email,
      subject: "Sending Email for reset password",
      text: `This link valid for 1 Day. Password reset link - http://localhost:3000/client/login/newPassword/${existingClient.id}/${setUserToken.verifytoken} `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error: ", error);
        res.send({ message: "Email was not sent" });
      } else {
        console.log("Email sent", info.response);
        res.send({ message: "Email was  sent successfully" });
      }
    });
  }

  // without storing past tokens
  // const mailOptions = {
  //   from: "bitlegioninfo@gmail.com",
  //   to: email,
  //   subject: "Sending Email for reset password",
  //   text: `This link valid for 1 day http://localhost:3000/client/login/newPassword/${existingClient.id}/${token} `,
  // };
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log("error: ", error);
  //     res.send({ message: "Email was not sent" });
  //   } else {
  //     console.log("Email sent", info.response);
  //     res.send({ message: "Email was  sent successfully" });
  //   }
  // });
};

// -----------------------------------------------------------------resetpwd----------------------------------------------------------------------

const newPassword = async (req, res, next) => {
  const { id, token } = req.params;
  try {
    // if i use token history
    const validUser = await Client.findOne({
      id: id,
      verifyToken: token,
    });

    // if I use, without verify tokens
    // const validUser = await Client.findOne({
    //   id: id,
    // });

    const verifyToken = jwt.verify(token, "supersecret_dont_share");

    if (validUser && verifyToken.userId) {
      res.send({ validUser: validUser });
    } else {
      res.send({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.send({ message: "user not exist" });
  }
};

const changePassword = async (req, res, next) => {
  const { id, token } = req.params;

  const { password } = req.body;

  try {
    // if i use token history
    const validUser = await Client.findOne({
      id: id,
      verifyToken: token,
    });

    // if I use, without verify tokens
    // const validUser = await Client.findOne({
    //   id: id,
    // });
    // console.log(validUser);

    const verifyToken = jwt.verify(token, "supersecret_dont_share");
    console.log(password);
    if (validUser && verifyToken.userId) {
      const newPasswordU = await bcrypt.hash(password, 12);
      console.log(newPasswordU);
      const setNewuserPass = await Client.findOneAndUpdate(
        { id: id },
        { password: newPasswordU },
        { new: true }
      );
      setNewuserPass.save();
      console.log("Done ", setNewuserPass);
      return res.send("password has been updated");
    } else {
      res.send({ status: 401, message: "user not exist" });
    }
    console.log(setNewuserPass);
  } catch (error) {
    res.send({ status: 401, message: "user not exist" });
  }
};

exports.signup = signup;
exports.login = login;
exports.forgotPwdClient = forgotPwdClient;
exports.newPassword = newPassword;
exports.changePassword = changePassword;
