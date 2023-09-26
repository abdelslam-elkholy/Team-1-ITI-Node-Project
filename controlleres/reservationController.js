const Reservation = require("../models/reservationModel");
const House = require("../models/houseModel");
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
    const house = await House.findById(req.body.houseId);

    const price =
      (house.price *
        (new Date(req.body.checkOut) - new Date(req.body.checkIn))) /
      (1000 * 60 * 60 * 24);

    const isValideDate =
      new Date(req.body.checkIn) < new Date(req.body.checkOut) &&
      new Date(req.body.checkIn) > new Date();

    if (!isValideDate) {
      return next(
        new AppError(
          `The checkin date must be before the checkout date and after today`,
          400
        )
      );
    }

    const checkAvailability = await Reservation.find({
      houseId: req.body.houseId,
      $or: [
        {
          checkIn: {
            $gte: req.body.checkIn,
            $lte: req.body.checkOut,
          },
        },
        {
          checkOut: {
            $gte: req.body.checkIn,
            $lte: req.body.checkOut,
          },
        },
      ],
    });

    if (checkAvailability.length > 0) {
      return next(
        new AppError(
          `The house is not available between ${req.body.checkIn} and ${req.body.checkOut}`,
          400
        )
      );
    }

    const newReservation = await Reservation.create({
      ...req.body,
      userId: req.user._id,
      price,
    });

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

exports.deleteReservation = async (req, res, next) => {
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

    if (req.user.role !== "admin" && req.user._id !== reservation.userId) {
      return next(
        new AppError("You are not allowed to delete this reservation", 403)
      );
    }

    await Reservation.findByIdAndDelete(req.params.id);

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

exports.getReservationsByUserId = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ userId: req.params.userId });

    res.status(200).json({
      status: "success",
      data: {
        reservations,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.getReservationsByHouseId = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({
      houseId: req.params.houseId,
    });

    res.status(200).json({
      status: "success",
      data: {
        reservations,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

// exports.getReservation = async (req, res, next) => {
//   try {
//     const reservation = await Reservation.findById(req.params.id);

//     if (!reservation) {
//       return next(
//         new AppError(
//           `There is no reservation with the id ${req.params.id}`,
//           404
//         )
//       );
//     }

//     res.status(200).json({
//       status: "Success",
//       data: {
//         reservation,
//       },
//     });
//   } catch (error) {
//     return next(new AppError(error.message, 500));
//   }
// };
