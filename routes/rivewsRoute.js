// @ts-nocheck
const express=require("express")
const RivewsModel=require("../models/rivewsModel.js")
const Router =express.Router()
const {saveRivew,GetRivew,UpdateRivew ,DeleteRivew}=require("../controllers/rivewsController.js");

Router.post("/",(req,res)=>{
const rivew = req.body;
saveRivew(rivew,res)
}).get("/:HostID",(req,res)=>{
    const {HostID}=req.params
    GetRivew(HostID,res)
}).patch("/:id",(req,res)=>{
    const {id,HostID,UserID,Rate,Rivew}=req.params
    UpdateRivew(id,HostID,UserID,Rate,Rivew)
}).delete("/:id",(req,res)=>{
    const { id } = req.params;
    DeleteRivew(id,res)
})

module.exports = Router;