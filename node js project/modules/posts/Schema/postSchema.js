 
const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
   title:String,
   description:{type:String} , 
   createdBy:{
    type:mongoose.Types.ObjectId,
    ref:"User"
}
},{
    timestamps:true
})

module.exports =   PostSchema ;
