const uuid = require("uuid/v4");
const Client = require("../models/clients");
const Admins = require("../models/admin");
const Coach = require("../models/coaches");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error.js");
const nodemailer = require("nodemailer");

//-----------------------------Email configuration ---------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bitlegioninfo@gmail.com",
    pass: "ayzggsrtobpayzuh",
  },
});

//-----------------------------HeadCoach Signup------------------

const signupHeadCoach = async (req, res, next) => {
  const {
    firstName,
    lastName,
    password,
    address,
    nicNumber,
    gender,
    mobileNumber,
    whatsapp,
    landLine,
    email,
    website,
    athleticArchievements,
    experiences,
    personalTraining,
    onlineCoaching,
    socialAccounts,
    isSubscribed,
    certificates,
  } = req.body;

  console.log(certificates);

  let existingCoach;
  try {
    existingCoach = await Coach.findOne({ email: email });
    if (!existingCoach) {
      existingCoach = await Client.findOne({ email: email });
    }

    if (!existingCoach) {
      existingCoach = await Admins.findOne({ email: email });
    }
  } catch (err) {
    res.send({ message: "Signup faild, Please try again" });
    const error = new HttpError("Signup faild.Please try again", 500);
    return next(error);
  }
  if (existingCoach) {
    res.send({ message: "User already exists,Use different Email" });
    const error = new HttpError("User already exists,Use different Email", 422);
    return next(error);
  }
  // hashed password

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 12); // 12 is salt value
  } catch (err) {
    res.send({ message: "Couldn't create user, please try again" });
    const error = new HttpError("Couldn't create user, please try again", 500);
    return next(error);
  }

  const createdCoach = new Coach({
    id: uuid(),
    firstName: firstName,
    lastName: lastName,
    password: hashedPassword,
    address: address,
    nicNo: nicNumber,
    gender: gender,
    moNumber: mobileNumber,
    whatsApp: whatsapp,
    lLine: landLine,
    email: email,
    webSite: website,
    athleticArchievements: athleticArchievements,
    experiences: experiences,

    role: "HeadCoach",

    verifytoken: "",
    personalTraining: personalTraining,
    onlineCoaching: onlineCoaching,
    socialMediaAccounts: socialAccounts,
    isSubscribedNewsletter: isSubscribed,
    certifictes: certificates,
  });
  console.log(createdCoach);

  try {
    await createdCoach.save();
  } catch (err) {
    res.send({ message: "Signning up faild,Please try again later" });
    const error = new HttpError(
      "Signning up faild,Please try again later",
      500
    );
    return next(error);
  }

  // jwt token ceation

  let tokenNew;
  // here i use the id that generaete the mongodb itself
  try {
    tokenNew = jwt.sign(
      { userId: createdCoach.id, email: createdCoach.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    res.send({ message: "Signning up faild,Please try again later" });
    const error = new HttpError(
      "Signning up faild,Please try again later",
      500
    );
    return next(error);
  }

  res.status(201).json({
    userId: createdCoach.id,
    email: createdCoach.email,
    token: tokenNew,
    message: "Registration successfull",
    userRole: createdCoach.role,
  });
};

//------------------------Generate link foe headCoach register--------------------

const generateLink = async (req, res, next) => {
  const { email } = req.body;

  let user;
  try {
    // try to find the user in the clients collection
    user = await Client.findOne({ email: email });

    // if not found, try to find the user in the coaches collection
    if (!user) {
      user = await Coach.findOne({ email: email });
    }

    if (!user) {
      user = await Admins.findOne({ email: email });
    }

    if (user) {
      const error = new HttpError(
        "user already exists,Try with anoter email",
        401
      );
      res.send({ message: "User already exists" });
      return next(error);
    }
  } catch (err) {
    // res.send({ message: "Process faild.Please try again" });
    const error = new HttpError("Process faild.Please try again", 500);
    return next(error);
  }

  const token = jwt.sign({ email: email }, "supersecret_dont_share", {
    expiresIn: "1d",
  });

  //  modify this to store token

  // send a mail with link
  const mailOptions = {
    from: "bitlegioninfo@gmail.com",
    to: email,
    subject: "Sending Email For Registering As a Coach",
    text: `This link valid for 1 day http://localhost:3000/signupHeadCoach/${token}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error: ", error);
      return res.send({ message: "Email was not sent" });
    } else {
      console.log("Email sent", info.response);
      res.send({ message: "Email was  sent successfully" });
    }
  });
};

//-------------------------Sign up Client--------------------------------------------------

const signupClient = async (req, res, next) => {
  const { firstName, lastName, password, email, mobileNumber, gender } =
    req.body;

  let user;

  try {
    // try to find the user in the clients collection
    user = await Client.findOne({ email: email });

    // if not found, try to find the user in the coaches collection
    if (!user) {
      user = await Coach.findOne({ email: email });
    }

    if (!user) {
      user = await Admins.findOne({ email: email });
    }
  } catch (err) {
    res.send({ message: "Signup faild.Please try again" });
    const error = new HttpError("Signup faild.Please try again", 500);
    return next(error);
  }

  if (user) {
    // if the user is not found in either collection, send an error response
    res.send({ message: "User already registered" });
    const error = new HttpError("User already registered", 401);
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12); // 12 is salt value
  } catch (err) {
    res.send({ message: "Couldn't create user, please try again" });
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
    role: "Client",
    verifytoken: "",

    // isSubscribedNewsletter: isSubscribedNewsletter,
  });
  console.log(createdClient);

  try {
    await createdClient.save();
  } catch (err) {
    res.send({ message: "Signning up faild,Please try again later" });
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
    res.send({ message: "Signning up faild,Please try again later" });
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
    message: "Registration successful",
    userRole: createdClient.role,
  });
};
//-------------------------Admin sign up-----------------------------------------------

const signupAdmin = async (req, res, next) => {
  const { firstName, lastName, password, email, mobileNumber } = req.body;

  let user;

  try {
    // try to find the user in the clients collection
    user = await Client.findOne({ email: email });

    // if not found, try to find the user in the coaches collection
    if (!user) {
      user = await Coach.findOne({ email: email });
    }

    if (!user) {
      user = await Admins.findOne({ email: email });
    }
  } catch (err) {
    res.send({ message: "Signup faild.Please try again" });
    const error = new HttpError("Signup faild.Please try again", 500);
    return next(error);
  }

  if (user) {
    // if the user is not found in either collection, send an error response
    res.send({ message: "User already registered" });
    const error = new HttpError("User already registered", 401);
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12); // 12 is salt value
  } catch (err) {
    res.send({ message: "Couldn't create user, please try again" });
    const error = new HttpError("Couldn't create user, please try again", 500);
    return next(error);
  }

  const createdAdmin = new Admins({
    id: uuid(),
    firstName: firstName,
    lastName: lastName,
    password: hashedPassword,
    moNumber: mobileNumber,
    email: email,
    role: "Admin",
  });
  console.log(createdAdmin);

  try {
    await createdAdmin.save();
  } catch (err) {
    res.send({ message: "Signning up faild,Please try again later" });
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
      { userId: createdAdmin.id, email: createdAdmin.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    res.send({ message: "Signning up faild,Please try again later" });
    const error = new HttpError(
      "Signning up faild,Please try again later",
      500
    );
    return next(error);
  }

  res.status(201).json({
    usertId: createdAdmin.id,
    email: createdAdmin.email,
    token: token,
    message: "Registration successful",
    userRole: createdAdmin.role,
  });
};

//-------------------------User login--------------------------------------------------
const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    // try to find the user in the clients collection
    user = await Client.findOne({ email: email });

    // if not found, try to find the user in the coaches collection
    if (!user) {
      user = await Coach.findOne({ email: email });
    }

    if (!user) {
      user = await Admins.findOne({ email: email });
    }
  } catch (err) {
    res.send({ message: "Loging in faild.Please try again" });
    const error = new HttpError("Loging in faild.Please try again", 500);
    return next(error);
  }

  if (!user) {
    // if the user is not found in either collection, send an error response
    res.send({ message: "User not found" });
    const error = new HttpError("User not found", 401);
    return next(error);
  }

  // verify the password

  let isPasswordValid = false;
  try {
    isPasswordValid = await bcrypt.compare(password, user.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again",
      500
    );
    return next(error);
  }

  if (!isPasswordValid) {
    // if the password is incorrect, send an error response
    res.send({ message: "Invalid Password" });
    const error = new HttpError("Invalid password, could not log you in", 401);
    return next(error);
  }

  // create a JWT token for the user
  let token;

  try {
    token = jwt.sign(
      { userId: user.id, email: user.email },
      "supersecret_dont_share", // this private key should be same as signup process
      { expiresIn: "1h" }
    );
  } catch (err) {
    res.send({ message: "Login faild! Please try again" });
    const error = new HttpError("Logging in faild,Please try again later", 500);
    return next(error);
  }
  res.json({
    userId: user.id,
    email: user.email,
    token: token,
    message: "Login success",
    userRole: user.role,
  });
};

//-----------------------------Send Pwd Reset Link---------------------------------------------
const sendPwdResetLink = async (req, res, next) => {
  const { email } = req.body;

  let user;
  try {
    user = await Client.findOne({ email: email });
    console.log("user from Client", user);

    if (!user) {
      user = await Coach.findOne({ email: email });
      console.log("user from coach", user);
    }
    if (!user) {
      user = await Admins.findOne({ email: email });
      console.log("user from coach", user);
    }
  } catch (err) {
    res.send({ message: "Process faild.Please try again" });
    const error = new HttpError("Process faild.Please try again", 500);
    return next(error);
  }

  if (!user) {
    res.send({ message: "User not found" });
    const error = new HttpError("User not found", 401);
    return next(error);
  }

  // create token
  const token = jwt.sign({ userId: user.id }, "supersecret_dont_share", {
    expiresIn: "1d",
  });

  // check weather the user is same as user that  requested to reset pwd
  let setUserToken;

  setUserToken = await Client.findByIdAndUpdate(
    { _id: user._id }, // here should be mongodb _id. not Id that we generated
    { verifytoken: token },
    {
      new: true,
    }
  );

  if (!setUserToken) {
    setUserToken = await Coach.findByIdAndUpdate(
      { _id: user._id }, // here should be mongodb _id. not Id that we generated
      { verifytoken: token },
      {
        new: true,
      }
    );
  }

  if (setUserToken) {
    const mailOptions = {
      from: "bitlegioninfo@gmail.com",
      to: email,
      subject: "Sending Email for reset password",
      text: `This link valid for 1 day. Password reset Link - http://localhost:3000/newPassword/${user.id}/${setUserToken.verifytoken} `,
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
};

//------------------------------verify the user ---------------------------------------------------------------------------------------------
const verifyUser = async (req, res, send) => {
  const { id, token } = req.params;

  let validUser;

  try {
    validUser = await Client.findOne({
      id: id,
      verifyToken: token,
    });

    if (!validUser) {
      validUser = await Coach.findOne({
        id: id,
        verifyToken: token,
      });
    }

    // confirm for valid unexpired token
    const verifyToken = jwt.verify(token, "supersecret_dont_share");

    if (validUser && verifyToken.userId) {
      res.send({ validUser: validUser });
    } else {
      res.send({ status: 401, message: "user not exist" });
    }
  } catch (err) {
    res.send({ message: "Unauthorized Access" });
    const error = new HttpError("Unauthorized Access", 401);
    return next(error);
  }
};

//------------------------------Update new password--------------------------------------------------------------------------------

const changePassword = async (req, res, next) => {
  const { id, token } = req.params;
  const { password } = req.body;

  let validUser;

  try {
    validUser = await Client.findOne({
      id: id,
      verifyToken: token,
    });

    if (!validUser) {
      validUser = await Coach.findOne({
        id: id,
        verifyToken: token,
      });
    }
    if (!validUser) {
      validUser = await Admins.findOne({
        id: id,
        verifyToken: token,
      });
    }

    const verifyToken = jwt.verify(token, "supersecret_dont_share");

    if (validUser && verifyToken.userId) {
      const newPassword = await bcrypt.hash(password, 12);
      console.log(newPassword);
      let setNewuserPass;

      setNewuserPass = await Client.findOneAndUpdate(
        { id: id },
        { password: newPassword },
        { new: true }
      );

      if (!setNewuserPass) {
        setNewuserPass = await Coach.findOneAndUpdate(
          { id: id },
          { password: newPassword },
          { new: true }
        );
      }
      if (!setNewuserPass) {
        setNewuserPass = await Admins.findOneAndUpdate(
          { id: id },
          { password: newPassword },
          { new: true }
        );
      }
      setNewuserPass.save();
      console.log("Done ", setNewuserPass);
      return res.send("password has been updated");
    } else {
      res.send({ status: 401, message: "Couldn't find user" });
    }
    console.log(setNewuserPass);
  } catch (err) {
    res.send({ status: 401, message: "user not exist" });
  }
};

// ############################################################ headcoache controllers###################################

const getClients = async (req, res, next) => {
  try {
    const clients = await Client.find({}).sort({ firstName: 1 });
    res.status(200).send(clients);
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal server error.Please Try again",
    });
    const error = new HttpError("Process faild.Please try again", 500);
    next(error);
  }
  // sorted -> last registration is being seen at first
};

const sendMail = async (req, res, next) => {
  const { email, subject, message } = req.body;
  const mailOptions = {
    from: "bitlegioninfo@gmail.com",
    to: email,
    subject: subject,
    text: message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("error: ", error);
      return res.send({ message: "Email was not sent" });
    } else {
      console.log("Email sent", info.response);
      res.send({ message: "Email was  sent successfully" });
    }
  });
};

// ############################################################ get coache by id##############################################

const getCoach = async (req, res, next) => {
  let userId = req.params.userId;
  let coach;
  try {
    coach = await Coach.findOne({ id: userId });

    if (!coach) {
      // if the user is not found in either collection, send an error response
      res.send({ message: "User not found" });
      const error = new HttpError("User not found", 401);
      return next(error);
    }
    res.send(coach);
  } catch (err) {
    res.send({ message: "Process faild.Please try again" });
    const error = new HttpError("Process faild.Please try again", 500);
    next(error);
  }
};

// ############################################################ get coaches##############################################

const getCoachList = async (req, res, next) => {
  try {
    const coaches = await Coach.find({}).sort({ firstName: 1 });
    res.status(200).send(coaches);
  } catch (err) {
    res.send({
      status: 500,
      message: "Internal server error.Please Try again",
    });
    const error = new HttpError("Process faild.Please try again", 500);
    next(error);
  }
};

//------------------------------exports----------------------------------------------------------------------------------
exports.login = login;
exports.signupHeadCoach = signupHeadCoach;
exports.signupAdmin = signupAdmin;
exports.generateLink = generateLink;
exports.signupClient = signupClient;
exports.sendPwdResetLink = sendPwdResetLink;
exports.verifyUser = verifyUser;
exports.changePassword = changePassword;

// headcoache
exports.getClients = getClients;
exports.getCoach = getCoach;
exports.sendMail = sendMail;

// admin
exports.getCoachList = getCoachList;
