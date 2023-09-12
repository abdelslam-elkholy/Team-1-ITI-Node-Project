const Reservation = require("../models/reservationModel");
const { AppError } = require("../utils/appError");

exports.getAllReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();

    res.status(200).json({
      status: "success",
      reservationCount: reservations.length,
      data: {
        reservations,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
exports.createReservation = async (req, res, next) => {
  try {
    const newReservation = await Reservation.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        reservation: newReservation,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.getReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return next(
        new AppError(
          `There is no reservation with the id ${req.params.id}`,
          404
        )
      );
    }

    res.status(200).json({
      status: "Success",
      data: {
        reservation,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.updateReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!reservation) {
      return next(
        new AppError(
          `There is no reservation with the id ${req.params.id}`,
          404
        )
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        reservation,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!reservation) {
      return next(
        new AppError(
          `There is no reservation with the id ${req.params.id}`,
          404
        )
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        reservation,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
