const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_STRING, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};

exports.signUp = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    const token = createToken(user._id);
    res.status(201).json({
      message: "Done",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "autherization Failed",
      err: {
        err,
      },
    });
  }
};

exports.signIn = async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(404)
      .json({ message: "please provide username and password" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "invalid username or password" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "invalid username  or password" });
    }
    //                      paylod                     secret key
    const token = createToken(user._id);
    res.status(200).json({ token, status: "success" });
  } catch (err) {
    res.status(400).json({ message: err.message, kmlkm: "jnjok" });
  }
};
