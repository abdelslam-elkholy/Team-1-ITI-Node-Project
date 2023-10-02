const Reservation = require("../models/reservationModel");
const House = require("../models/houseModel");
const { AppError } = require("../utils/appError");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51Nvcg1Guqo6CM9lqtfEESuSSTnVQIfGIgvZutCwww5kA80K51mTyR8xURpmJZ8bUFnaZGGSiCmQPHeWuQK99QPUI009wLJkllV"
);
console.log(process.env.STRIPE_SECRET_KEY);
exports.payment = async (req, res, next) => {
  const { id, checkIn, checkOut } = req.body;
  const house = await House.findById(id);

  const price =
    (house.price * (new Date(checkOut) - new Date(checkIn))) /
    (1000 * 60 * 60 * 24);

  const isValideDate =
    new Date(checkIn) < new Date(checkOut) && new Date(checkIn) > new Date();

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

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: house.name,
              images: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaWQZyUWL5KqcqjDkmy8KLuUZGk_cvLGy8Hg&usqp=CAU",
              ],
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.protocol}://${req.get("host")}/`,
      cancel_url: "http://localhost:4242/cancel",
    });

    // res.redirect(303, session.url);

    const newReservation = await Reservation.create({
      houseId: id,
      checkIn,
      checkOut,
      userId: req.user._id,
      price,

      // stripeSessionId: session.id,
    });
    res.status(200).json({
      status: "success",
      session,
    });
    // res.redirect(303, session.url);
    // res.status(201).json({
    //   status: "success",
    //   clientSecret: session.client_secret,
    //   reservation: newReservation,
    //   url: session.url,
    // });
    // res.status(200).json({
    //   status: "success",
    //   clientSecret: session.client_secret,
    //   reservation: newReservation,
    // });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

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
