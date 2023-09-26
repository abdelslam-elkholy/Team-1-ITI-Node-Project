const Rivew = require("../models/reviewModel");
const { AppError } = require("../utils/appError");

exports.getAllRivews = async (req, res, next) => {
  try {
    const rivews = await Rivew.find();

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
    const review = await Rivew.findById(req.params.id);

    if (!review) {
      return next(
        new AppError(`There is no review with the id ${req.params.id}`, 404)
      );
    }

    if (review.userId.toString() !== req.user._id.toString()) {
      return next(
        new AppError(
          `You are not allowed to update this review with the id ${req.params.id}`,
          400
        )
      );
    }

    const newRivew = await Rivew.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        userId: req.user._id,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      status: "Success",
      data: {
        review: newRivew,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.deleteRivew = async (req, res, next) => {
  try {
    const rivew = await Rivew.findById(req.params.id);

    if (!rivew) {
      return next(
        new AppError(`There is no rivew with the id ${req.params.id}`, 404)
      );
    }

    if (
      rivew.userId.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return next(
        new AppError(
          `You are not allowed to delete this rivew with the id ${req.params.id}`,
          403
        )
      );
    }

    await Rivew.findByIdAndDelete(req.params.id);

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
