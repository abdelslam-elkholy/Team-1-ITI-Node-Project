const User = require("../models/userModel");
const { AppError } = require("../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      userCount: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.updateMe = async (req, res, next) => {
  const filteredBody = filterObj(req.body, "name", "email");
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      filteredBody,
      {
        new: true,
      }
    );
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.deleteMe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { active: false });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// exports.getOneUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);

//     res.status(200).json({
//       status: "success",
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     return next(new AppError(error.message, 500));
//   }
// };

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.deactivateUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { active: false });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.activateUser = async (req, res, next) => {
  try {
    User.disablePreHook = true;
    await User.findByIdAndUpdate(req.params.id, { active: true });
    User.disablePreHook = undefined;
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.getDeactivatedUsers = async (req, res, next) => {
  try {
    User.disablePreHook = true;
    const users = await User.find({ active: false });
    User.disablePreHook = undefined;

    res.status(200).json({
      status: "success",
      userCount: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.getHosts = async (req, res, next) => {
  try {
    const hosts = await User.find({ role: "host" });

    res.status(200).json({
      status: "success",
      data: {
        hosts,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
