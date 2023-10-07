const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, "title is less than 3 characters"],
      maxLength: [80, "title is more than 80 characters"],
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currencySymbol: {
      type: String,
      enum: ["$", "€", "EGP"],
      default: "$",
      required: false,
    },
    numberOfRooms: {
      type: Number,
      required: true,
    },
    numberOfBedrooms: {
      type: Number,
      required: true,
    },
    guestNumber: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
    },

    description: {
      type: String,
    },

    images: {
      type: [String],
      required: true,
    },

    category: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "category",
      required: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    region: {
      type: String,
      enum: ["Europe", "Italy", "United States", "Turkey", "Africa"],
      default: "Africa",
    },
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },

    unavailableDates: { type: [Date] },
  },

  {
    timestamps: true,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

houseSchema.virtual("reviews", {
  ref: "rivew",
  foreignField: "houseId",
  localField: "_id",
});

houseSchema.methods.calculateUnavailableDates = async function () {
  const reservations = await mongoose
    .model("reservation")
    .find({ houseId: this._id });

  const unavailableDates = [];

  for (const reservation of reservations) {
    const checkIn = reservation.checkIn;
    const checkOut = reservation.checkOut;

    let currentDate = new Date(checkIn);

    while (currentDate <= checkOut) {
      unavailableDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return unavailableDates;
};

const House = mongoose.model("house", houseSchema);

module.exports = House;

// houseSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "category",
//     select: "-__v",
//   });
//   next();
// });

// houseSchema.virtual("reservations", {
//   ref: "reservation",
//   foreignField: "houseId",
//   localField: "_id",
// });

// houseSchema.virtual("unavailableDates").get(async function () {
//   const reservations = await mongoose
//     .model("reservation")
//     .find({ houseId: this._id });

//   const unavailableDates = [];

//   for (const reservation of reservations) {
//     const checkIn = reservation.checkIn;
//     const checkOut = reservation.checkOut;

//     let currentDate = new Date(checkIn);

//     while (currentDate <= checkOut) {
//       // console.log(currentDate, unavailableDates);

//       unavailableDates.push(new Date(currentDate));
//       currentDate.setDate(currentDate.getDate() + 1);
//     }

//     // unavailableDates.push(...datesBetween);
//   }

//   console.log(unavailableDates);

//   return unavailableDates;
// });

// houseSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "unavailableDates",
//     select: "-__v",
//   }).exec();

//   next();
// });

// houseSchema.pre(/^find/, function (next) {
//   console.log("here2");
//   this.populate({
//     path: "reviews",
//     select: "-__v",
//   });

//   next();
// });
