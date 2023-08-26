const mongoose=require ("mongoose");
const RivewsSchema=new mongoose.Schema({
    HostID:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"host"
    },
    UserID:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"user"
    },
    Rate:{
        type:Number,
        enum:[1,2,3,4,5],
        default:1,
        require:true,
    },
    Rivew:{
        type:Number,
        require:true
    }
})

const RivewsModel=mongoose.model("Rivew",RivewsSchema)
module.exports = RivewsModel;