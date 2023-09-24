const Rivew = require("../models/reviewModel");
const { AppError } = require("../utils/appError");

exports.getAllRivews = async (req, res, next) => {
  try {
    const rivews = await Rivew.find().populate("userId houseId");

    res.status(200).json({
      status: "success",
      rivewCount: rivews.length,
      data: {
        rivews,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.createRivew = async (req, res, next) => {
  try {
    const checkRivew = await Rivew.findOne({
      houseId: req.body.houseId,
      userId: req.user._id,
    });

    if (checkRivew) {
      return next(
        new AppError(
          `You already have a rivew on this house with the id ${req.body.houseId}`,
          400
        )
      );
    }

    const newRivew = await Rivew.create({ ...req.body, userId: req.user._id });

    res.status(201).json({
      status: "success",
      data: {
        rivew: newRivew,
      },
    });
  } catch (error) {
    console.log(error);
    return next(new AppError(error.message, 500));
  }
};

exports.getRivew = async (req, res, next) => {
  try {
    const rivew = await Rivew.findById(req.params.id);

    if (!rivew) {
      return next(
        new AppError(`There is no rivew with the id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: "Success",
      data: {
        rivew,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.updateRivew = async (req, res, next) => {
  try {
    const review = await Rivew.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!review) {
      return next(
        new AppError(`There is no review with the id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      status: "Success",
      data: {
        review,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.deleteRivew = async (req, res, next) => {
  try {
    const rivew = await Rivew.findByIdAndDelete(req.params.id);

    if (!rivew) {
      return next(
        new AppError(`There is no rivew with the id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: "Success",
      data: {
        rivew,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.getRivewsByHouseId = async (req, res, next) => {
  try {
    const rivews = await Rivew.find({ houseId: req.params.houseId });

    if (!rivews) {
      return next(
        new AppError(
          `There is no rivews with the house id ${req.params.houseId}`,
          404
        )
      );
    }

    res.status(200).json({
      status: "Success",
      data: {
        rivews,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.getRivewsByUserId = async (req, res, next) => {
  try {
    const rivews = await Rivew.find({ userId: req.params.userId });

    if (!rivews) {
      return next(
        new AppError(
          `There is no rivews with the user id ${req.params.userId}`,
          404
        )
      );
    }

    res.status(200).json({
      status: "Success",
      data: {
        rivews,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.getRivewsByHouseIdAndUserId = async (req, res, next) => {
  try {
    const rivews = await Rivew.find({
      houseId: req.params.houseId,
      userId: req.params.userId,
    });

    if (!rivews) {
      return next(
        new AppError(
          `There is no rivews with the user id ${req.params.userId} and house id ${req.params.houseId}`,
          404
        )
      );
    }

    res.status(200).json({
      status: "Success",
      data: {
        rivews,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
