const mongoose = require("mongoose")

var Reservation = mongoose.Schema({
    hostId :{
     type: mongoose.SchemaTypes.ObjectId,
    ref :"host",
    require: true,
    uniq: true
    },
    userId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref :"user",
        require: true,
        uniq: true
    },
    checkinDate:{
        type: Date,
        require: true
    },
    checkoutDate:{
        type: Date,
        require: true
    },
    price:{
        type:Number
    }
},
{
  timestamps: {
    createdAt: "created_at", // Use `created_at` to store the created date
    updatedAt: "updated_at", // and `updated_at` to store the last updated date
  },
})

var ReservationModel = mongoose.model("reservation",Reservation);
module.exports = ReservationModel