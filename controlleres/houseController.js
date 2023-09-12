const House = require("../models/houseModel");
const { AppError } = require("../utils/appError");

exports.getAllHouses = async (req, res, next) => {
  try {
    const houses = await House.find();

    res.status(200).json({
      status: "success",
      houseCount: houses.length,
      data: {
        houses,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.createHouse = async (req, res, next) => {
  try {
    const newHouse = await House.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        house: newHouse,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.getHouse = async (req, res, next) => {
  try {
    const house = await House.findById(req.params.id);

    if (!house) {
      return next(
        new AppError(`There is no house with the id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: "Success",
      data: {
        house,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.updateHouse = async (req, res, next) => {
  try {
    const house = await House.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!house) {
      return next(
        new AppError(`There is no house with the id ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: "Success",
      data: {
        house,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.deleteHouse = async (req, res, next) => {
  try {
    const house = await House.findByIdAndDelete(req.params.id);

    if (!house) {
      return next(
        new AppError(`There is no house with the id ${req.params.id}`, 404)
      );
    }

    res.status(204).json({
      status: "success",
      data: {
        deletedHouse: house,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
