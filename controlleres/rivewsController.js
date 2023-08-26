
const model=require("../models/rivewsModel")
const mongoose = require("mongoose");
const express= require("express")
// post rivew 
async function saveRivew(req,res){
    try {
      const NewRivew = await model.create(req)
      res.status(200).json({message:"crate",data:{NewRivew} })  
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
//  get rivew bu hostId 
async function GetRivew(HostID,res){
    try {
        const rivew=await model.findOne({_HostID:HostID})
        // res.status(200).json({ data: rivew });
        if (rivew) {
            res.status(200).json({ data: rivew });
           } else {
            res.status(400).json({ message: "Error Not Find rivew" });
           } 
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
// Update user
async function UpdateRivew(id,HostID,UserID,Rate,Rivew,res) {
    //   return model.findByIdAndUpdate(id, { title: title });
    
    try {
        const rivew = await model.findByIdAndUpdate({ _id: id,HostID,UserID,Rate,Rivew});
        rivew.HostID = HostID;
        rivew.UserID = UserID;
        rivew.Rate = Rate;
        rivew.Rivew = Rivew;
        res.status(200).json({ data: rivew });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    }
    
    //Delete user
     async function DeleteRivew(id,res) {
    //   return model.findByIdAndRemove(id);
    try {
      const rivew = await model.findByIdAndRemove(id);
      res.status(201).json({ data: rivew });
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    }
module.exports={saveRivew,GetRivew,UpdateRivew ,DeleteRivew}
